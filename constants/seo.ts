import { Metadata } from 'next';

// Configuración base de SEO
export const SEO_CONFIG = {
    siteName: 'Magu Cerámica',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://maguceramica.com',
    defaultTitle: 'Magu Cerámica - Cerámica Artesanal Hecha a Mano',
    defaultDescription: 'Descubre piezas únicas de cerámica artesanal, hechas a mano con amor y dedicación. Cada producto cuenta su propia historia. Tazas, platos, jarrones y más.',
    defaultKeywords: [
        'cerámica artesanal',
        'cerámica hecha a mano',
        'tazas artesanales',
        'platos de cerámica',
        'jarrones artesanales',
        'alfarería',
        'cerámica decorativa',
        'vajilla artesanal',
        'regalos únicos',
        'arte en cerámica',
        'cerámica argentina',
        'productos artesanales'
    ],
    locale: 'es_AR',
    type: 'website',
    twitterHandle: '@maguceramica',
    facebookPage: 'maguceramica',
    instagramHandle: '@maguceramica',
};

// Metadata base para compartir en todas las páginas
export const baseMetadata: Metadata = {
    metadataBase: new URL(SEO_CONFIG.siteUrl),
    title: {
        default: SEO_CONFIG.defaultTitle,
        template: `%s | ${SEO_CONFIG.siteName}`,
    },
    description: SEO_CONFIG.defaultDescription,
    keywords: SEO_CONFIG.defaultKeywords,
    authors: [{ name: SEO_CONFIG.siteName }],
    creator: SEO_CONFIG.siteName,
    publisher: SEO_CONFIG.siteName,
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: 'website',
        locale: SEO_CONFIG.locale,
        url: SEO_CONFIG.siteUrl,
        siteName: SEO_CONFIG.siteName,
        title: SEO_CONFIG.defaultTitle,
        description: SEO_CONFIG.defaultDescription,
        images: [
            {
                url: `${SEO_CONFIG.siteUrl}/logo.webp`,
                width: 1200,
                height: 630,
                alt: SEO_CONFIG.siteName,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: SEO_CONFIG.twitterHandle,
        creator: SEO_CONFIG.twitterHandle,
        title: SEO_CONFIG.defaultTitle,
        description: SEO_CONFIG.defaultDescription,
        images: [`${SEO_CONFIG.siteUrl}/logo.webp`],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/iconoLogo.webp',
    },
    manifest: '/manifest.json',
};

// Función helper para crear metadata de página
export function createPageMetadata({
    title,
    description,
    keywords,
    path = '',
    image,
    noIndex = false,
}: {
    title: string;
    description: string;
    keywords?: string[];
    path?: string;
    image?: string;
    noIndex?: boolean;
}): Metadata {
    const url = `${SEO_CONFIG.siteUrl}${path}`;
    const imageUrl = image || `${SEO_CONFIG.siteUrl}/logo.webp`;
    const allKeywords = keywords
        ? [...SEO_CONFIG.defaultKeywords, ...keywords]
        : SEO_CONFIG.defaultKeywords;

    return {
        title,
        description,
        keywords: allKeywords,
        alternates: {
            canonical: url,
        },
        openGraph: {
            type: 'website',
            locale: SEO_CONFIG.locale,
            url,
            siteName: SEO_CONFIG.siteName,
            title,
            description,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            site: SEO_CONFIG.twitterHandle,
            creator: SEO_CONFIG.twitterHandle,
            title,
            description,
            images: [imageUrl],
        },
        robots: noIndex
            ? {
                  index: false,
                  follow: false,
              }
            : {
                  index: true,
                  follow: true,
                  googleBot: {
                      index: true,
                      follow: true,
                      'max-video-preview': -1,
                      'max-image-preview': 'large',
                      'max-snippet': -1,
                  },
              },
    };
}

// JSON-LD Structured Data Templates
export const createOrganizationSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    logo: `${SEO_CONFIG.siteUrl}/logo.webp`,
    description: SEO_CONFIG.defaultDescription,
    sameAs: [
        `https://facebook.com/${SEO_CONFIG.facebookPage}`,
        `https://instagram.com/${SEO_CONFIG.instagramHandle}`,
        `https://twitter.com/${SEO_CONFIG.twitterHandle}`,
    ],
    contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['Spanish', 'es'],
    },
});

export const createWebSiteSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    description: SEO_CONFIG.defaultDescription,
    inLanguage: 'es-AR',
    potentialAction: {
        '@type': 'SearchAction',
        target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SEO_CONFIG.siteUrl}/tienda?search={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
    },
});

export const createBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${SEO_CONFIG.siteUrl}${item.url}`,
    })),
});

export const createProductSchema = (product: {
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    stock?: number;
}) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    category: product.category,
    offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'ARS',
        availability: (product.stock === undefined || product.stock > 0)
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
        seller: {
            '@type': 'Organization',
            name: SEO_CONFIG.siteName,
        },
    },
});

export const createFAQPageSchema = (faqs: Array<{ question: string; answer: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
        },
    })),
});
