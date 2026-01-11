import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import Link from 'next/link';

export const metadata = {
  title: 'How I Work | Costa Rica Property Guide',
  description: 'I am not a real estate agent. I connect qualified buyers with trusted local firms in Costa Rica.',
};

export default function HowIWorkPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 bg-amber-50/50">
          <div className="container-narrow text-center">
            <h1 className="heading-1 mb-6">
              How I Work
            </h1>
            <p className="body-large">
              Clarity on my role and what you can expect.
            </p>
          </div>
        </section>

        {/* What I Am / What I'm Not */}
        <section className="section-padding bg-white">
          <div className="container-narrow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* What I Am NOT */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  What I Am NOT
                </h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2 text-gray-400">•</span>
                    <span>I am <strong>not a licensed real estate agent</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-gray-400">•</span>
                    <span>I do <strong>not represent buyers or sellers</strong> in transactions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-gray-400">•</span>
                    <span>I do <strong>not sell or list properties</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-gray-400">•</span>
                    <span>I do <strong>not provide legal or financial advice</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-gray-400">•</span>
                    <span>I do <strong>not guarantee any outcomes</strong></span>
                  </li>
                </ul>
              </div>

              {/* What I AM */}
              <div className="border border-primary-200 bg-primary-50/30 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  What I AM
                </h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary-600">•</span>
                    <span><strong>An educator</strong> who explains the buying process</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary-600">•</span>
                    <span><strong>A connector</strong> who introduces you to trusted local firms</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary-600">•</span>
                    <span><strong>A local resident</strong> who knows Guanacaste firsthand</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary-600">•</span>
                    <span><strong>Someone who helps clarify</strong> your goals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary-600">•</span>
                    <span><strong>A guide</strong> who points you in the right direction</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* My Process */}
            <div className="mb-16">
              <h2 className="heading-3 mb-8">
                My Process
              </h2>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary-700 font-medium">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">You Reach Out</h3>
                    <p className="text-gray-600">
                      You contact me via WhatsApp or the intake form. I learn about your goals,
                      budget, timeline, and what you're looking for.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary-700 font-medium">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">We Have a Conversation</h3>
                    <p className="text-gray-600">
                      I answer your questions about the market, the buying process, and specific areas.
                      I help you think through what you actually need vs. what you think you want.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary-700 font-medium">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">I Make an Introduction</h3>
                    <p className="text-gray-600">
                      If you're ready and qualified, I introduce you to a trusted local real estate firm
                      that matches your needs. I explain your situation to them so you don't start from scratch.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary-700 font-medium">4</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">You Work Directly With Them</h3>
                    <p className="text-gray-600">
                      From there, you work directly with the real estate firm. They show properties,
                      facilitate the transaction, and handle the professional work.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* How I'm Compensated */}
            <div className="bg-amber-50/50 rounded-lg p-8 mb-16">
              <h2 className="heading-3 mb-4">
                How I'm Compensated
              </h2>
              <p className="text-gray-600 mb-4">
                I receive a referral fee from partner firms when a transaction closes successfully.
                This fee comes from the firm's commission—<strong>it does not increase your costs</strong>.
              </p>
              <p className="text-gray-600">
                This model aligns my interests with yours: I only benefit when you successfully buy a property
                you're happy with, through a firm that treats you well.
              </p>
            </div>

            {/* Why This Model */}
            <div className="mb-16">
              <h2 className="heading-3 mb-4">
                Why This Model?
              </h2>
              <p className="text-gray-600 mb-4">
                I'm not trying to be everything to everyone. I recognized that:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Foreign buyers need trusted entry points, not more noise</li>
                <li>Established local firms have inventory and expertise I can't replicate</li>
                <li>The value I add is qualification, education, and trust—not transaction processing</li>
              </ul>
              <p className="text-gray-600">
                By staying focused on what I do well, I can genuinely help buyers and add value
                to the firms I work with.
              </p>
            </div>

            {/* CTA */}
            <div className="text-center">
              <h3 className="heading-3 mb-4">
                Questions About How I Work?
              </h3>
              <p className="text-gray-600 mb-8">
                I'm happy to explain anything in more detail.
              </p>
              <WhatsAppCTA message="Hi Hyam, I have questions about how your referral service works.">
                Ask Hyam a question
              </WhatsAppCTA>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
