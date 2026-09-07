import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { sanityClient } from 'sanity:client';

const builder = createImageUrlBuilder(sanityClient);

/** Sized, auto-format URL from a Sanity image field. Juan uploads full-res; we request what we need. */
export function imageUrl(source: SanityImageSource, width: number, height?: number) {
  let b = builder.image(source).width(width).auto('format').quality(85);
  if (height) b = b.height(height).fit('crop');
  return b.url();
}
