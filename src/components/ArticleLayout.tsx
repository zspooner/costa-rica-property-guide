interface ArticleLayoutProps {
  title: string;
  author: string;
  authorDescription: string;
  children: React.ReactNode;
}

export default function ArticleLayout({
  title,
  author,
  authorDescription,
  children,
}: ArticleLayoutProps) {
  return (
    <article>
      {/* Header with warm background */}
      <header className="py-16 md:py-24 bg-amber-50/50">
        <div className="max-w-2xl mx-auto px-6 sm:px-8">
          <h1 className="text-3xl md:text-4xl font-serif font-normal text-gray-900 leading-tight mb-6">
            {title}
          </h1>
          <div className="border-l-4 border-primary-500 pl-4">
            <p className="text-lg font-medium text-gray-900">{author}</p>
            <p className="text-gray-600">{authorDescription}</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-6 sm:px-8">
          <div className="prose prose-lg prose-gray max-w-none">
            {children}
          </div>
        </div>
      </div>
    </article>
  );
}
