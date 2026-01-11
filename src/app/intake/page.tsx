'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BUDGET_RANGES, TIMELINES, INTENDED_USES } from '@/lib/constants';

export default function IntakePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget_range: '',
    timeline: '',
    intended_use: '',
    area_interest: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/buyers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit');
      }

      router.push('/thanks');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="section-padding bg-amber-50/50">
          <div className="container-narrow">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Tell Me About Your Search
                </h1>
                <p className="text-gray-600">
                  Help me understand your goals so I can connect you with the right partner.
                </p>
              </div>

              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="John Smith"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Budget Range */}
                <div>
                  <label htmlFor="budget_range" className="block text-sm font-medium text-gray-700 mb-1">
                    Budget Range *
                  </label>
                  <select
                    id="budget_range"
                    name="budget_range"
                    required
                    value={formData.budget_range}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select a range</option>
                    {BUDGET_RANGES.map(range => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Timeline */}
                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">
                    When are you looking to buy? *
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    required
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select a timeline</option>
                    {TIMELINES.map(t => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Intended Use */}
                <div>
                  <label htmlFor="intended_use" className="block text-sm font-medium text-gray-700 mb-1">
                    What's the property for? *
                  </label>
                  <select
                    id="intended_use"
                    name="intended_use"
                    required
                    value={formData.intended_use}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select intended use</option>
                    {INTENDED_USES.map(use => (
                      <option key={use.value} value={use.value}>
                        {use.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Area of Interest */}
                <div>
                  <label htmlFor="area_interest" className="block text-sm font-medium text-gray-700 mb-1">
                    Areas of Interest *
                  </label>
                  <textarea
                    id="area_interest"
                    name="area_interest"
                    required
                    rows={3}
                    value={formData.area_interest}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="e.g., Tamarindo, Playa Grande, anywhere near good surf..."
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Tell me about locations, features, or priorities that matter to you.
                  </p>
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>

              <p className="mt-6 text-center text-sm text-gray-500">
                By submitting, you agree to be contacted about your property search.
                I don't share your information with anyone except trusted partner firms.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
