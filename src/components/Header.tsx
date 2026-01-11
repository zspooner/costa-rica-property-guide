'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container-wide">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-serif font-medium text-primary-700">
            Costa Rica Property Guide
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/insights/why-i-guide-buyers-in-guanacaste" className="text-gray-600 hover:text-primary-600 transition-colors">
              Local Insight
            </Link>
            <Link href="/how-buying-works" className="text-gray-600 hover:text-primary-600 transition-colors">
              How Buying Works
            </Link>
            <Link href="/how-i-work" className="text-gray-600 hover:text-primary-600 transition-colors">
              How I Work
            </Link>
            <Link href="/intake" className="btn-primary">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link
                href="/insights/why-i-guide-buyers-in-guanacaste"
                className="text-gray-600 hover:text-primary-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Local Insight
              </Link>
              <Link
                href="/how-buying-works"
                className="text-gray-600 hover:text-primary-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                How Buying Works
              </Link>
              <Link
                href="/how-i-work"
                className="text-gray-600 hover:text-primary-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                How I Work
              </Link>
              <Link
                href="/intake"
                className="btn-primary text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
