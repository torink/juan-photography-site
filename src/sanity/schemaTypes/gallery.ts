import { defineField, defineType } from 'sanity';

const photos = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [{ type: 'image', options: { hotspot: true } }],
    description,
  });

export const gallery = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  groups: [
    { name: 'main', title: 'Photos', default: true },
    { name: 'details', title: 'Details' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required(), group: 'main' }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      description: 'Click Generate. This becomes the page URL.',
      options: { source: 'title' },
      validation: (r) => r.required(),
      group: 'main',
    }),
    defineField({
      name: 'cover',
      title: 'Cover photo',
      type: 'image',
      description: 'Shown on the home page.',
      options: { hotspot: true },
      validation: (r) => r.required(),
      group: 'main',
    }),
    photos('heroImages', 'Top of page photos', 'Full-screen slideshow at the top of this gallery. Leave empty to use the cover photo.'),
    photos('photos', 'Photos', 'The main run of photos. Drag to reorder. Full-resolution uploads are fine.'),
    defineField({
      name: 'sections',
      title: 'Sections (optional)',
      type: 'array',
      group: 'main',
      description: 'Split a gallery into titled parts, like Arrival, Ceremony, Dinner. Leave empty for one continuous run.',
      of: [
        {
          type: 'object',
          name: 'section',
          fields: [
            defineField({ name: 'title', title: 'Section title', type: 'string', validation: (r) => r.required() }),
            photos('photos', 'Photos'),
          ],
          preview: { select: { title: 'title', media: 'photos.0' } },
        },
      ],
    }),
    defineField({ name: 'description', title: 'Short description', type: 'text', rows: 3, group: 'details', description: 'Optional. One or two sentences under the title.' }),
    defineField({ name: 'place', title: 'Place', type: 'string', group: 'details', description: 'e.g. Portland, OR' }),
    defineField({ name: 'year', title: 'Year', type: 'string', group: 'details' }),
    defineField({ name: 'film', title: 'Film / camera', type: 'string', group: 'details', description: 'e.g. Fuji Pro 400H, Minolta' }),
    defineField({ name: 'order', title: 'Order on home page', type: 'number', group: 'details', description: 'Lower numbers show first.', initialValue: 10 }),
  ],
  orderings: [{ title: 'Home page order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'place', media: 'cover' } },
});
