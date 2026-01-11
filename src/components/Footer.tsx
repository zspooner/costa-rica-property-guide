import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-serif font-medium mb-4">Costa Rica Property Guide</h3>
            <p className="text-gray-400 text-sm">
              Helping you navigate the Costa Rica real estate market with confidence.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/insights/why-i-guide-buyers-in-guanacaste" className="text-gray-400 hover:text-white transition-colors">
                  Why I Know Guanacaste
                </Link>
              </li>
              <li>
                <Link href="/how-buying-works" className="text-gray-400 hover:text-white transition-colors">
                  How Buying Works
                </Link>
              </li>
              <li>
                <Link href="/how-i-work" className="text-gray-400 hover:text-white transition-colors">
                  How I Work
                </Link>
              </li>
              <li>
                <Link href="/intake" className="text-gray-400 hover:text-white transition-colors">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Focus Areas</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Playa Grande</li>
              <li>Playa Flamingo</li>
              <li>Tamarindo</li>
              <li>Guanacaste Province</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Costa Rica Property Guide. All rights reserved.</p>
          <p className="mt-2">
            I am not a licensed real estate agent. I connect buyers with trusted local firms.
          </p>
        </div>
      </div>
    </footer>
  );
}
