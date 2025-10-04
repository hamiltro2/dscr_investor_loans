interface ArticleSchemaProps {
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  author: string;
  image: string;
  url: string;
}

export function ArticleSchema({
  headline,
  description,
  datePublished,
  dateModified,
  author,
  image,
  url
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": headline,
    "description": description,
    "image": {
      "@type": "ImageObject",
      "url": `https://www.capitalbridgesolutions.com${image}`,
      "width": 1200,
      "height": 630
    },
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Organization",
      "name": author,
      "url": "https://www.capitalbridgesolutions.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Capital Bridge Solutions",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.capitalbridgesolutions.com/logo.png",
        "width": 192,
        "height": 192
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "articleSection": "Real Estate Investment Financing",
    "keywords": "DSCR loans, investment property loans, California real estate financing"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
