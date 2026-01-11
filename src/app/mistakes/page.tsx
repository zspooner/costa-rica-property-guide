'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppCTA from '@/components/WhatsAppCTA';

const MISTAKES = [
  {
    number: 1,
    title: 'Buying in a Maritime Zone without understanding the concession',
    detail: "The first 200 meters from high tide is public land in Costa Rica. The next 150 meters requires a government concession - you don't own it, you lease it. Some concessions run 20 years. Some are about to expire. Some can't be transferred to foreigners at all.",
    risk: 'Paying $600,000 for what turns out to be a 15-year lease with transfer restrictions.',
  },
  {
    number: 2,
    title: 'Skipping water rights verification',
    detail: "Municipal water, private well, ASADA cooperative, or government concession - each water source has different legal standing and reliability. Some 'water letters' are informal agreements that don't survive a property transfer.",
    risk: "Closing on a lot, hiring a builder, then discovering there's no legal water source.",
  },
  {
    number: 3,
    title: 'Assuming listing price reflects market value',
    detail: "Costa Rica has no centralized MLS. No pricing transparency. The same property can be listed at $450,000 by one agent and $580,000 by another. 'Gringo pricing' is real - and structural.",
    risk: 'Overpaying 20-30% because you comparison-shopped on the wrong websites.',
  },
  {
    number: 4,
    title: 'Treating Costa Rica zoning like US zoning',
    detail: "Your 'residential' lot might prohibit short-term rentals. Your 'ocean view' property might sit in a protected zone where you can't cut a single tree. The neighbor's vacant lot might become a hotel next year.",
    risk: 'Your rental income plan dies at the permit application stage.',
  },
  {
    number: 5,
    title: 'Rushing deposits under pressure',
    detail: "Informal deposits held by sellers or agents with no escrow protection. Wire instructions that arrive via WhatsApp. 'Another buyer is interested' urgency that creates artificial time pressure.",
    risk: 'Deposits that disappear or become non-refundable before you finish due diligence.',
  },
  {
    number: 6,
    title: "Using the seller's attorney",
    detail: "The seller offers to share their attorney to 'save you money.' That attorney has represented the seller on multiple transactions. Their job is closing the deal, not protecting you from the deal.",
    risk: "Issues that 'weren't worth mentioning' show up after you own the property.",
  },
  {
    number: 7,
    title: 'Falling in love before due diligence',
    detail: "You visit for a week. You find the perfect house with the perfect view. You make an offer the same day. Now you're emotionally committed before you've verified anything about title, water, access, or zoning.",
    risk: 'Every red flag becomes something you rationalize instead of investigate.',
  },
];

export default function MistakesPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = '7 Mistakes Americans Make Buying Property in Costa Rica';
  }, []);

  const toggleMistake = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gray-900 text-white">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
            <h1 className="text-3xl md:text-5xl font-serif font-normal mb-6 leading-tight text-white">
              7 Mistakes Americans Make Buying Property in Costa Rica
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              And how to avoid becoming another cautionary tale in Guanacaste.
            </p>
            <p className="text-sm text-gray-400">
              Based on years of working with American buyers in Playa Flamingo, Playa Grande, and Tamarindo.
            </p>
          </div>
        </section>

        {/* Stakes Section */}
        <section className="py-12 bg-amber-50/50">
          <div className="max-w-3xl mx-auto px-6 sm:px-8">
            <p className="text-xl text-gray-700 leading-relaxed text-center">
              Every month, Americans wire six figures to Costa Rica without fully understanding
              what they're buying. Some get lucky. Others discover the problems after closing.
            </p>
          </div>
        </section>

        {/* Mistakes Accordion */}
        <section className="py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-6 sm:px-8">
            <h2 className="heading-2 text-center mb-12">The mistakes that cost the most</h2>

            <div className="space-y-4">
              {MISTAKES.map((mistake, index) => (
                <div
                  key={mistake.number}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleMistake(index)}
                    className="w-full flex items-start gap-4 px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-medium text-sm">
                      {mistake.number}
                    </span>
                    <span className="flex-1 font-medium text-gray-900 pr-4">
                      {mistake.title}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 mt-1 ${
                        expandedIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {expandedIndex === index && (
                    <div className="px-6 pb-6 bg-white border-t border-gray-100">
                      <div className="pl-12">
                        <p className="text-gray-700 leading-relaxed mb-4 pt-4">
                          {mistake.detail}
                        </p>
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r">
                          <p className="text-red-800 font-medium text-sm">
                            The risk: {mistake.risk}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pattern Recognition Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-2xl mx-auto px-6 sm:px-8 text-center">
            <p className="text-xl text-gray-700 leading-relaxed">
              The buyers who succeed in Costa Rica share one trait: they slow down
              when everyone else is speeding up. They verify claims before wiring money.
              They hire their own attorney before the seller offers one.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-gray-900">
          <div className="max-w-2xl mx-auto px-6 sm:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-serif text-white mb-6">
              Ready to buy without these risks?
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-10">
              I work with a limited number of qualified buyers in Guanacaste.
              If you have a realistic budget and timeline, let's talk about what's actually available.
            </p>
            <WhatsAppCTA message="Hi Hyam, I read the 7 Mistakes article and would like to discuss buying property in Guanacaste.">
              Start a Conversation
            </WhatsAppCTA>
            <p className="text-gray-500 text-sm mt-6">
              I'll respond within 24 hours with relevant options or let you know if I'm not the right fit.
            </p>
          </div>
        </section>

        {/* Trust Footer */}
        <section className="py-8 bg-gray-100">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
            <p className="text-sm text-gray-600">
              Focus areas: Playa Flamingo, Playa Grande, Tamarindo, and surrounding Guanacaste
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
