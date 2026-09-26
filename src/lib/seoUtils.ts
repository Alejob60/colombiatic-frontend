// src/lib/seoUtils.ts

// Generate meta tags for SEO
export function generateMetaTags(title: string, description: string, url: string, image?: string) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'ColombiaTIC',
      images: image ? [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ] : undefined,
      locale: 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

// Generate structured data (JSON-LD) for SEO
export function generateStructuredData(data: any) {
  return {
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      ...data,
    }),
  };
}

// Generate breadcrumbs structured data
export function generateBreadcrumbs(breadcrumbs: { name: string; url: string }[]) {
  return {
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    }),
  };
}

// Generate FAQ structured data
export function generateFAQSchema(questions: { question: string; answer: string }[]) {
  return {
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: questions.map(q => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: q.answer,
        },
      })),
    }),
  };
}

// Generate organization structured data
export function generateOrganizationSchema() {
  return {
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'ColombiaTIC Ingeniería SAS',
      url: 'https://colombiatic.com.co',
      logo: 'https://colombiatic.com.co/logo.png',
      sameAs: [
        'https://www.linkedin.com/company/colombiatic',
        'https://www.instagram.com/colombiatic',
        'https://github.com/Colombiatic',
      ],
    }),
  };
}

// Generate website structured data
export function generateWebsiteSchema() {
  return {
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'ColombiaTIC',
      url: 'https://colombiatic.com.co',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://colombiatic.com.co/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    }),
  };
}

// Generate article structured data
export function generateArticleSchema(article: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  author: string;
  image?: string;
}) {
  return {
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.headline,
      description: article.description,
      datePublished: article.datePublished,
      dateModified: article.dateModified,
      author: {
        '@type': 'Person',
        name: article.author,
      },
      image: article.image,
      publisher: {
        '@type': 'Organization',
        name: 'ColombiaTIC Ingeniería SAS',
        logo: {
          '@type': 'ImageObject',
          url: 'https://colombiatic.com.co/logo.png',
        },
      },
    }),
  };
}