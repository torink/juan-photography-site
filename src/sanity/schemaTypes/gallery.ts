import { defineField, defineType } from 'sanity';

export const gallery = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      description: 'Click Generate. This becomes the page URL.',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short description',
      type: 'text',
      rows: 3,
      description: 'Optional. One or two sentences shown above the photos.',
    }),
    defineField({
      name: 'cover',
      title: 'Cover photo',
      type: 'image',
      description: 'Shown on the home page tile.',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Drag to reorder. Full-resolution uploads are fine.',
    }),
    defineField({
      name: 'order',
      title: 'Order on home page',
      type: 'number',
      description: 'Lower numbers show first.',
      initialValue: 10,
    }),
  ],
  orderings: [{ title: 'Home page order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', media: 'cover' } },
});
