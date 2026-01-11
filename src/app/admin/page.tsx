'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BUDGET_RANGES, TIMELINES, INTENDED_USES, REFERRAL_STATUSES } from '@/lib/constants';
import type { BuyerWithReferral, Partner, ReferralStatus } from '@/types/database';

function formatLabel(value: string, options: readonly { value: string; label: string }[]): string {
  const option = options.find(o => o.value === value);
  return option?.label || value;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function AdminBuyersPage() {
  const [buyers, setBuyers] = useState<BuyerWithReferral[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [buyersRes, partnersRes] = await Promise.all([
          fetch('/api/buyers'),
          fetch('/api/partners'),
        ]);

        if (!buyersRes.ok || !partnersRes.ok) {
          throw new Error('Failed to load data');
        }

        const buyersData = await buyersRes.json();
        const partnersData = await partnersRes.json();

        // Transform buyers data to include referral info
        const transformedBuyers = buyersData.buyers.map((buyer: { referrals?: Array<{ partners?: Partner }> }) => {
          const referralData = buyer.referrals?.[0];
          return {
            ...buyer,
            referral: referralData ? {
              ...referralData,
              partner: referralData.partners,
            } : undefined,
          };
        });

        setBuyers(transformedBuyers);
        setPartners(partnersData.partners || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleAssignPartner = async (buyerId: string, partnerId: string) => {
    try {
      const response = await fetch('/api/referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ buyer_id: buyerId, partner_id: partnerId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to assign partner');
      }

      // Reload data
      window.location.reload();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to assign partner');
    }
  };

  const handleStatusChange = async (referralId: string, status: ReferralStatus) => {
    try {
      const response = await fetch(`/api/referrals/${referralId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Update local state
      setBuyers(prev =>
        prev.map(b => {
          if (b.referral?.id === referralId) {
            return {
              ...b,
              referral: { ...b.referral, status },
            };
          }
          return b;
        })
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Incoming Buyers</h1>
        <p className="text-gray-600">
          {buyers.length} total buyer{buyers.length !== 1 ? 's' : ''}
        </p>
      </div>

      {buyers.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          No buyers yet. They'll appear here when they submit the intake form.
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Buyer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timeline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Partner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {buyers.map(buyer => {
                const statusConfig = REFERRAL_STATUSES.find(s => s.value === buyer.referral?.status);

                return (
                  <tr key={buyer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{buyer.name}</div>
                        <div className="text-sm text-gray-500">{buyer.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatLabel(buyer.budget_range, BUDGET_RANGES)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatLabel(buyer.timeline, TIMELINES)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {buyer.referral ? (
                        <span className="text-sm text-gray-900">
                          {buyer.referral.partner?.name || 'Unknown'}
                        </span>
                      ) : (
                        <select
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                          defaultValue=""
                          onChange={e => {
                            if (e.target.value) {
                              handleAssignPartner(buyer.id, e.target.value);
                            }
                          }}
                        >
                          <option value="">Assign partner...</option>
                          {partners.map(p => (
                            <option key={p.id} value={p.id}>
                              {p.name} ({p.firm})
                            </option>
                          ))}
                        </select>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {buyer.referral ? (
                        <select
                          className={`text-xs font-medium px-2 py-1 rounded ${statusConfig?.color || 'bg-gray-100'}`}
                          value={buyer.referral.status}
                          onChange={e => handleStatusChange(buyer.referral!.id, e.target.value as ReferralStatus)}
                        >
                          {REFERRAL_STATUSES.map(s => (
                            <option key={s.value} value={s.value}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(buyer.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/admin/buyers/${buyer.id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  );
}
