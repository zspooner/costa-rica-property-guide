import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import Link from 'next/link';

export const metadata = {
  title: 'Thank You | Costa Rica Property Guide',
  description: 'Your inquiry has been received. I\'ll be in touch soon.',
};

export default function ThanksPage() {
  return (
    <>
      <Header />
      <main>
        <section className="section-padding bg-amber-50/50 min-h-[60vh] flex items-center">
          <div className="container-narrow">
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              {/* Success Icon */}
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Thank You!
              </h1>

              <p className="text-lg text-gray-600 mb-6">
                I've received your information and will review it shortly.
              </p>

              {/* Next Steps */}
              <div className="bg-amber-50/50 rounded-lg p-6 mb-8 text-left">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  What Happens Next
                </h2>
                <ol className="space-y-3">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-sm font-medium mr-3">
                      1
                    </span>
                    <span className="text-gray-600">
                      I'll review your goals and timeline within 24-48 hours
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-sm font-medium mr-3">
                      2
                    </span>
                    <span className="text-gray-600">
                      I may reach out with questions or to schedule a brief call
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-sm font-medium mr-3">
                      3
                    </span>
                    <span className="text-gray-600">
                      Once I understand your needs, I'll introduce you to an appropriate partner firm
                    </span>
                  </li>
                </ol>
              </div>

              {/* Want Faster Response */}
              <div className="mb-8">
                <p className="text-gray-600 mb-4">
                  Want a faster response? Reach out directly on WhatsApp.
                </p>
                <WhatsAppCTA message="Hi Hyam, I just submitted an inquiry on your website and wanted to connect directly.">
                  Message Hyam on WhatsApp
                </WhatsAppCTA>
              </div>

              {/* Back to Home */}
              <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
                ← Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
