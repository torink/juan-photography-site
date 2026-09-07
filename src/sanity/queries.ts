import { sanityClient } from 'sanity:client';

export type SanityImage = { asset: { _ref: string }; hotspot?: unknown; crop?: unknown };

export type SiteSettings = {
  name: string;
  tagline?: string;
  heroImage?: SanityImage;
  aboutImage?: SanityImage;
  aboutText?: string;
  email?: string;
  instagram?: string;
};

export type Gallery = {
  title: string;
  slug: string;
  description?: string;
  cover: SanityImage;
  photos?: SanityImage[];
};

const FALLBACK_SETTINGS: SiteSettings = { name: 'Juan Briseno', tagline: 'Photography' };

async function safe<T>(query: string, params: Record<string, unknown>, fallback: T): Promise<T> {
  try {
    const result = await sanityClient.fetch<T>(query, params);
    return result ?? fallback;
  } catch (err) {
    console.warn('[sanity] query failed, using fallback:', (err as Error).message);
    return fallback;
  }
}

export const getSiteSettings = () =>
  safe<SiteSettings>(`*[_type == "siteSettings"][0]{name, tagline, heroImage, aboutImage, aboutText, email, instagram}`, {}, FALLBACK_SETTINGS);

export const getGalleries = () =>
  safe<Gallery[]>(`*[_type == "gallery" && defined(slug.current)] | order(order asc, title asc){title, "slug": slug.current, description, cover, photos}`, {}, []);

export const getGallery = (slug: string) =>
  safe<Gallery | null>(`*[_type == "gallery" && slug.current == $slug][0]{title, "slug": slug.current, description, cover, photos}`, { slug }, null);
