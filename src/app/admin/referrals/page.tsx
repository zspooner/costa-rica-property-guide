'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { REFERRAL_STATUSES } from '@/lib/constants';
import type { ReferralWithDetails, ReferralStatus } from '@/types/database';

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function AdminReferralsPage() {
  const [referrals, setReferrals] = useState<ReferralWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    async function loadReferrals() {
      try {
        const url = statusFilter
          ? `/api/referrals?status=${statusFilter}`
          : '/api/referrals';
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to load referrals');
        const data = await response.json();

        // Transform data
        const transformed = data.referrals.map((r: { buyers?: object; partners?: object }) => ({
          ...r,
          buyer: r.buyers,
          partner: r.partners,
        }));

        setReferrals(transformed);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load referrals');
      } finally {
        setLoading(false);
      }
    }

    loadReferrals();
  }, [statusFilter]);

  const handleStatusChange = async (referralId: string, status: ReferralStatus) => {
    try {
      const response = await fetch(`/api/referrals/${referralId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error('Failed to update status');

      setReferrals(prev =>
        prev.map(r => (r.id === referralId ? { ...r, status } : r))
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  // Stats
  const stats = {
    total: referrals.length,
    new: referrals.filter(r => r.status === 'new').length,
    active: referrals.filter(r => r.status === 'active').length,
    closed: referrals.filter(r => r.status === 'closed').length,
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
        <h1 className="text-2xl font-bold text-gray-900">Referrals</h1>
        <p className="text-gray-600">Track buyer-to-partner assignments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-blue-50 rounded-lg shadow p-4">
          <p className="text-sm text-blue-600">New</p>
          <p className="text-2xl font-bold text-blue-700">{stats.new}</p>
        </div>
        <div className="bg-green-50 rounded-lg shadow p-4">
          <p className="text-sm text-green-600">Active</p>
          <p className="text-2xl font-bold text-green-700">{stats.active}</p>
        </div>
        <div className="bg-purple-50 rounded-lg shadow p-4">
          <p className="text-sm text-purple-600">Closed</p>
          <p className="text-2xl font-bold text-purple-700">{stats.closed}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="mb-4">
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All Statuses</option>
          {REFERRAL_STATUSES.map(s => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Referrals Table */}
      {referrals.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          No referrals yet. Assign buyers to partners from the Buyers page.
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
                  Partner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Updated
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {referrals.map(referral => {
                const statusConfig = REFERRAL_STATUSES.find(s => s.value === referral.status);

                return (
                  <tr key={referral.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/admin/buyers/${referral.buyer_id}`}
                        className="text-primary-600 hover:underline"
                      >
                        <div className="text-sm font-medium">{referral.buyer?.name}</div>
                        <div className="text-xs text-gray-500">{referral.buyer?.email}</div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{referral.partner?.name}</div>
                      <div className="text-xs text-gray-500">{referral.partner?.firm}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        className={`text-xs font-medium px-2 py-1 rounded ${statusConfig?.color || 'bg-gray-100'}`}
                        value={referral.status}
                        onChange={e => handleStatusChange(referral.id, e.target.value as ReferralStatus)}
                      >
                        {REFERRAL_STATUSES.map(s => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(referral.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(referral.updated_at)}
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
