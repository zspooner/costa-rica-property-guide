'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { BUDGET_RANGES, TIMELINES, INTENDED_USES, REFERRAL_STATUSES } from '@/lib/constants';
import type { BuyerWithReferral, Partner, ReferralStatus } from '@/types/database';

function formatLabel(value: string, options: readonly { value: string; label: string }[]): string {
  const option = options.find(o => o.value === value);
  return option?.label || value;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function BuyerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [buyer, setBuyer] = useState<BuyerWithReferral | null>(null);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [buyerRes, partnersRes] = await Promise.all([
          fetch(`/api/buyers/${id}`),
          fetch('/api/partners'),
        ]);

        if (!buyerRes.ok) {
          throw new Error('Buyer not found');
        }

        const buyerData = await buyerRes.json();
        const partnersData = await partnersRes.json();

        // Transform buyer data
        const referralData = buyerData.buyer.referrals?.[0];
        const transformedBuyer = {
          ...buyerData.buyer,
          referral: referralData ? {
            ...referralData,
            partner: referralData.partners,
          } : undefined,
        };

        setBuyer(transformedBuyer);
        setPartners(partnersData.partners || []);
        setNotes(transformedBuyer.referral?.notes || '');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load buyer');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  const handleAssignPartner = async (partnerId: string) => {
    try {
      const response = await fetch('/api/referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ buyer_id: id, partner_id: partnerId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to assign partner');
      }

      window.location.reload();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to assign partner');
    }
  };

  const handleStatusChange = async (status: ReferralStatus) => {
    if (!buyer?.referral) return;

    try {
      const response = await fetch(`/api/referrals/${buyer.referral.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      setBuyer(prev => {
        if (!prev?.referral) return prev;
        return {
          ...prev,
          referral: { ...prev.referral, status },
        };
      });
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  const handleSaveNotes = async () => {
    if (!buyer?.referral) return;

    try {
      const response = await fetch(`/api/referrals/${buyer.referral.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      });

      if (!response.ok) {
        throw new Error('Failed to save notes');
      }

      alert('Notes saved');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save notes');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error || !buyer) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {error || 'Buyer not found'}
      </div>
    );
  }

  const statusConfig = REFERRAL_STATUSES.find(s => s.value === buyer.referral?.status);

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin" className="text-primary-600 hover:text-primary-700 text-sm">
          ← Back to Buyers
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Buyer Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Buyer Information</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="text-sm text-gray-900">{buyer.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="text-sm text-gray-900">
                  <a href={`mailto:${buyer.email}`} className="text-primary-600 hover:underline">
                    {buyer.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Budget Range</dt>
                <dd className="text-sm text-gray-900">{formatLabel(buyer.budget_range, BUDGET_RANGES)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Timeline</dt>
                <dd className="text-sm text-gray-900">{formatLabel(buyer.timeline, TIMELINES)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Intended Use</dt>
                <dd className="text-sm text-gray-900">{formatLabel(buyer.intended_use, INTENDED_USES)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Submitted</dt>
                <dd className="text-sm text-gray-900">{formatDate(buyer.created_at)}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Areas of Interest</dt>
                <dd className="text-sm text-gray-900 mt-1">{buyer.area_interest}</dd>
              </div>
            </dl>
          </div>

          {/* Notes */}
          {buyer.referral && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Notes</h2>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Add notes about this buyer..."
              />
              <button
                onClick={handleSaveNotes}
                className="mt-3 btn-primary text-sm"
              >
                Save Notes
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Partner Assignment */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Partner Assignment</h2>
            {buyer.referral ? (
              <div>
                <div className="mb-4">
                  <span className="text-sm text-gray-500">Assigned to:</span>
                  <p className="text-sm font-medium text-gray-900">{buyer.referral.partner?.name}</p>
                  <p className="text-xs text-gray-500">{buyer.referral.partner?.firm}</p>
                </div>
                <div className="mb-4">
                  <span className="text-sm text-gray-500">Assigned on:</span>
                  <p className="text-sm text-gray-900">{formatDate(buyer.referral.created_at)}</p>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-500 mb-3">Not yet assigned to a partner.</p>
                <select
                  className="w-full text-sm border border-gray-300 rounded px-3 py-2"
                  defaultValue=""
                  onChange={e => {
                    if (e.target.value) {
                      handleAssignPartner(e.target.value);
                    }
                  }}
                >
                  <option value="">Select a partner...</option>
                  {partners.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.firm})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Status */}
          {buyer.referral && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Status</h2>
              <select
                className={`w-full text-sm font-medium px-3 py-2 rounded ${statusConfig?.color || 'bg-gray-100'}`}
                value={buyer.referral.status}
                onChange={e => handleStatusChange(e.target.value as ReferralStatus)}
              >
                {REFERRAL_STATUSES.map(s => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              {buyer.referral.updated_at && (
                <p className="text-xs text-gray-500 mt-2">
                  Last updated: {formatDate(buyer.referral.updated_at)}
                </p>
              )}
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <a
                href={`mailto:${buyer.email}`}
                className="block w-full text-center btn-outline text-sm"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
