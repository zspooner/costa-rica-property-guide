import Link from 'next/link';
import Image from 'next/image';

export default function TrustSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Image */}
          <div className="flex justify-center md:justify-start">
            <div className="w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden">
              <Image
                src="/images/hyam-hosny.jpg"
                alt="Hyam Hosny"
                width={320}
                height={320}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <p className="eyebrow">Local perspective</p>
            <h2 className="heading-2 mb-6">
              Guidance grounded in lived experience
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Hyam Hosny lived in Costa Rica for over eight years, owned and sold a home
              in Playa Grande, built and operated a local business, and raised her family
              in Guanacaste. Her guidance comes from firsthand experience navigating the
              realities of buying, living, and investing in the region.
            </p>
            <Link
              href="/insights/why-i-guide-buyers-in-guanacaste"
              className="text-link inline-flex items-center group"
            >
              Read Hyam's story
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
      </div>
    </section>
  );
}
