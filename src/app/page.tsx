import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import TrustSection from '@/components/TrustSection';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-amber-50/50">
          <div className="max-w-3xl mx-auto px-6 sm:px-8">
            <h1 className="heading-1 mb-6">
              Thinking about buying property in Costa Rica?
            </h1>
            <p className="body-large mb-10 max-w-2xl">
              I've lived in Guanacaste for over eight years, bought and sold property here,
              and learned what actually matters. Let me help you understand the process
              before you make any decisions.
            </p>
            <WhatsAppCTA message="Hi Hyam, I'm interested in learning more about buying property in Costa Rica.">
              Talk to Hyam
            </WhatsAppCTA>
          </div>
        </section>

        {/* Trust Section */}
        <TrustSection />

        {/* How It Works */}
        <section className="py-20 md:py-28 bg-amber-50/50">
          <div className="max-w-3xl mx-auto px-6 sm:px-8">
            <p className="eyebrow">How it works</p>
            <h2 className="heading-2 mb-12">
              A simple, grounded process
            </h2>
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-medium">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Learn how buying in Costa Rica actually works
                  </h3>
                  <p className="text-gray-600">
                    Understand the legal process, ownership structures, due diligence
                    requirements, and what makes Costa Rica different from buying back home.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-medium">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Get clarity on your budget, timeline, and goals
                  </h3>
                  <p className="text-gray-600">
                    I help you think through what you're looking for, what's realistic,
                    and what questions you should be asking before you start looking.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-medium">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Get connected with a trusted local firm when ready
                  </h3>
                  <p className="text-gray-600">
                    When you're prepared to move forward, I introduce you to established
                    real estate professionals in Guanacaste who can guide your purchase.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <Link
                href="/how-buying-works"
                className="text-link inline-flex items-center group"
              >
                Learn more about the buying process
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Reassuring CTA Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-2xl mx-auto px-6 sm:px-8 text-center">
            <h2 className="heading-3 mb-6">
              No pressure. Just clarity.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              Buying property in Costa Rica doesn't need to feel rushed or confusing.
              I'm here to help you understand the process before you make any decisions.
            </p>
            <WhatsAppCTA message="Hi Hyam, I have a question about buying property in Guanacaste.">
              Ask a question about buying in Guanacaste
            </WhatsAppCTA>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
