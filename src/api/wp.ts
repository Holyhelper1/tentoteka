export type WPImage = {
  id: number;
  url: string;
  alt?: string;
  caption?: string;
  link?: string;
  order?: number;
};

// Типы для WordPress REST API
type WPPostTitle = {
  rendered: string;
};

type WPAcfImage = {
  url: string;
  alt?: string;
};

type WPPostAcfFields = {
  slide_image?: WPAcfImage;
  slide_title?: string;
  slide_link?: string;
  slide_order?: string | number;
};

type WPEmbeddedMedia = {
  source_url: string;
  alt_text?: string;
};

type WPEmbedded = {
  'wp:featuredmedia'?: WPEmbeddedMedia[];
};

type WPPost = {
  id: number;
  title: WPPostTitle;
  acf?: WPPostAcfFields;
  _embedded?: WPEmbedded;
};

// const WP_BASE = 'https://ce468225-wordpress-lw69k.tw1.ru/wp-json';
const WP_BASE = 'https://tentoteka.ru/wp-json';

function extractImageFromPost(post: WPPost): WPImage | null {
  const acf = post.acf || {};
  const acfImg = acf.slide_image;
  
  if (acfImg && acfImg.url) {
    return {
      id: post.id,
      url: acfImg.url,
      alt: acfImg.alt || acf.slide_title || post.title.rendered || '',
      caption: acf.slide_title || post.title.rendered || '',
      link: acf.slide_link || undefined,
      order: acf.slide_order ? Number(acf.slide_order) : undefined,
    };
  }

  const media = post._embedded?.['wp:featuredmedia']?.[0];
  if (media?.source_url) {
    return {
      id: post.id,
      url: media.source_url,
      alt: media.alt_text || post.title.rendered || '',
      caption: post.title.rendered || '',
      link: undefined,
      order: undefined,
    };
  }

  return null;
}

export async function fetchSlides(): Promise<WPImage[]> {
  const res = await fetch(`${WP_BASE}/wp/v2/slider?per_page=50&_embed`);
  
  if (!res.ok) {
    throw new Error(`WP slides fetch failed: ${res.status}`);
  }
  
  const posts: WPPost[] = await res.json();
  
  const imgs = posts
    .map(post => extractImageFromPost(post))
    .filter((x): x is WPImage => x !== null)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    
  return imgs;
}



// export type WPImage = {
//   id: number;
//   url: string;
//   alt?: string;
//   caption?: string;
//   link?: string;
//   order?: number;
// };

// const WP_BASE = 'https://cg468456-wordpress-23m26.tw1.ru/wp-json';

// function extractImageFromPost(post: any): WPImage | null {
//   const acf = post.acf || {};
//   const acfImg = acf.slide_image;
//   if (acfImg && typeof acfImg === 'object' && acfImg.url) {
//     return {
//       id: post.id,
//       url: acfImg.url,
//       alt: acfImg.alt || acf.slide_title || post.title?.rendered || '',
//       caption: acf.slide_title || post.title?.rendered || '',
//       link: acf.slide_link || null,
//       order: acf.slide_order ? Number(acf.slide_order) : undefined,
//     };
//   }

//   const media = post._embedded?.['wp:featuredmedia']?.[0];
//   if (media && media.source_url) {
//     return {
//       id: post.id,
//       url: media.source_url,
//       alt: media.alt_text || post.title?.rendered || '',
//       caption: post.title?.rendered || '',
//       link: '',
//       order: undefined,
//     };
//   }

//   return null;
// }

// export async function fetchSlides(): Promise<WPImage[]> {
//   const res = await fetch(`${WP_BASE}/wp/v2/slider?per_page=50&_embed`);
//   if (!res.ok) {
//     throw new Error(`WP slides fetch failed: ${res.status}`);
//   }
//   const posts = await res.json();
//   const imgs = posts
//     .map((p: any) => extractImageFromPost(p))
//     .filter((x: WPImage | null): x is WPImage => !!x)
//     .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0)); // исправить : any
//   return imgs;
// }
