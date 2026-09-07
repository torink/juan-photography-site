import { sanityClient } from 'sanity:client';

export type SanityImage = { asset: { _ref: string }; hotspot?: { x: number; y: number; width: number; height: number }; crop?: { top: number; bottom: number; left: number; right: number } };

export type SiteSettings = {
  name: string;
  tagline?: string;
  heroImages?: SanityImage[];
  aboutImage?: SanityImage;
  aboutText?: string;
  email?: string;
  phone?: string;
  instagram?: string;
  based?: string;
};

export type GallerySection = { title: string; photos?: SanityImage[] };

export type Gallery = {
  title: string;
  slug: string;
  description?: string;
  cover: SanityImage;
  heroImages?: SanityImage[];
  photos?: SanityImage[];
  sections?: GallerySection[];
  place?: string;
  year?: string;
  film?: string;
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

// heroImages falls back to the old single heroImage so existing content keeps rendering.
const SETTINGS = `*[_type == "siteSettings"][0]{
  name, tagline, aboutImage, aboutText, email, phone, instagram, based,
  "heroImages": coalesce(heroImages, select(defined(heroImage) => [heroImage], []))
}`;

const GALLERY_FIELDS = `title, "slug": slug.current, description, cover, heroImages, photos, sections, place, year, film`;

export const getSiteSettings = () => safe<SiteSettings>(SETTINGS, {}, FALLBACK_SETTINGS);

export const getGalleries = () =>
  safe<Gallery[]>(`*[_type == "gallery" && defined(slug.current)] | order(order asc, title asc){${GALLERY_FIELDS}}`, {}, []);

export const getGallery = (slug: string) =>
  safe<Gallery | null>(`*[_type == "gallery" && slug.current == $slug][0]{${GALLERY_FIELDS}}`, { slug }, null);

export type Package = { name: string; price?: string; summary?: string; includes?: string[] };
export type Pricing = { intro?: string; packages?: Package[]; note?: string };

export const getPricing = () =>
  safe<Pricing | null>(`*[_type == "pricing"][0]{intro, packages, note}`, {}, null);
