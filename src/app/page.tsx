import HomeContainer from '@/components/HomeContainer';
import { constructMetadata } from '@/lib/metadata';

export const metadata = constructMetadata();

export default function Home() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'TimeSwitchr',
    'url': 'https://timeswitchr.com',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://timeswitchr.com/{search_term_string}',
      'query-input': 'required name=search_term_string'
    },
    'description': 'Fast, minimalist time zone converter.'
  };

  const orgData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'TimeSwitchr',
    'url': 'https://timeswitchr.com',
    'logo': 'https://timeswitchr.com/opengraph-image',
  };

  return (
    <>
      <HomeContainer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgData) }}
      />
    </>
  );
}
