import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import Link from 'next/link';

export const metadata = {
  title: 'How Buying Property in Costa Rica Works | Costa Rica Property Guide',
  description: 'Learn the essential steps to buy property in Costa Rica as a foreigner. Understand due diligence, legal requirements, and common mistakes to avoid.',
};

export default function HowBuyingWorksPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 bg-amber-50/50">
          <div className="container-narrow text-center">
            <h1 className="heading-1 mb-6">
              How Buying Property in Costa Rica Works
            </h1>
            <p className="body-large">
              What every foreign buyer needs to know before starting their search.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding bg-white">
          <div className="container-narrow">
            <div className="space-y-16">
              {/* No MLS */}
              <div>
                <h2 className="heading-3 mb-6">
                  There Is No MLS in Costa Rica
                </h2>
                <p className="text-gray-600 mb-4">
                  Unlike the United States, Costa Rica has no centralized Multiple Listing Service.
                  This means properties are scattered across different brokerages, individual agents,
                  and direct owner sales.
                </p>
                <p className="text-gray-600 mb-4">
                  What this means for you:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li>No single website shows all available properties</li>
                  <li>The same property may appear at different prices from different sources</li>
                  <li>Many quality properties are never advertised online</li>
                  <li>Local relationships matter more than internet searches</li>
                </ul>
                <p className="text-gray-600">
                  This is why working with established local firms—not just online searches—is essential.
                </p>
              </div>

              {/* Due Diligence */}
              <div>
                <h2 className="heading-3 mb-6">
                  Due Diligence Is Non-Negotiable
                </h2>
                <p className="text-gray-600 mb-4">
                  In the US, title insurance protects buyers from most title problems. In Costa Rica,
                  you are responsible for thorough due diligence before purchase.
                </p>
                <p className="text-gray-600 mb-4">
                  A proper due diligence process includes:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li><strong>Title search</strong> — Verify ownership, liens, and encumbrances in the National Registry</li>
                  <li><strong>Survey verification</strong> — Confirm property boundaries match registered plans</li>
                  <li><strong>Municipal permits</strong> — Check building permits, occupancy status, and tax status</li>
                  <li><strong>Zoning compliance</strong> — Verify allowed uses and building restrictions</li>
                  <li><strong>Environmental review</strong> — Check for protected areas or environmental restrictions</li>
                  <li><strong>Water and utilities</strong> — Confirm legal water rights and utility access</li>
                </ul>
                <p className="text-gray-600">
                  Never skip due diligence to "save money" or speed up a deal. Problems discovered
                  after purchase can be expensive or impossible to fix.
                </p>
              </div>

              {/* Common Mistakes */}
              <div>
                <h2 className="heading-3 mb-6">
                  Common Foreign Buyer Mistakes
                </h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-400 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900">Buying in the Maritime Zone without understanding restrictions</h4>
                    <p className="text-gray-600 text-sm mt-1">
                      The first 200m from high tide has special rules. Some areas are buildable via concession,
                      others are not. Don't assume beachfront means you can build.
                    </p>
                  </div>
                  <div className="border-l-4 border-red-400 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900">Trusting verbal promises</h4>
                    <p className="text-gray-600 text-sm mt-1">
                      "The permit is coming" or "The water letter is approved" means nothing until it's documented.
                      Get everything in writing and verified independently.
                    </p>
                  </div>
                  <div className="border-l-4 border-red-400 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900">Using a non-specialized attorney</h4>
                    <p className="text-gray-600 text-sm mt-1">
                      Your cousin's friend who practices family law is not qualified for real estate due diligence.
                      Use an attorney who specializes in Costa Rican real estate transactions.
                    </p>
                  </div>
                  <div className="border-l-4 border-red-400 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900">Buying remotely without visiting</h4>
                    <p className="text-gray-600 text-sm mt-1">
                      Photos and videos don't show road conditions, neighbor situations, or the feel of an area.
                      Always visit before making a commitment.
                    </p>
                  </div>
                </div>
              </div>

              {/* Why Local Expertise */}
              <div>
                <h2 className="heading-3 mb-6">
                  Why Local Expertise Matters
                </h2>
                <p className="text-gray-600 mb-4">
                  Costa Rica real estate is relationship-based. Local agents and firms know:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li>Which properties are genuinely available vs. test-listings at inflated prices</li>
                  <li>Historical context about specific properties and sellers</li>
                  <li>Areas that match your lifestyle needs (surf access, expat community, privacy, etc.)</li>
                  <li>Red flags that don't appear in listings or documents</li>
                  <li>Trusted attorneys, inspectors, and other professionals</li>
                </ul>
                <p className="text-gray-600">
                  I connect you with established firms who have this knowledge and have earned trust
                  through years of successful transactions.
                </p>
              </div>

              {/* CTA */}
              <div className="bg-amber-50/50 rounded-lg p-8 text-center">
                <h3 className="heading-3 mb-4">
                  Have questions?
                </h3>
                <p className="text-gray-600 mb-8">
                  I'm happy to answer questions about the buying process in Costa Rica.
                </p>
                <WhatsAppCTA message="Hi Hyam, I've read about the buying process and have some questions.">
                  Ask Hyam a question
                </WhatsAppCTA>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
