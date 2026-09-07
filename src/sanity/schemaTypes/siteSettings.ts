import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string', description: 'One short line under your name.' }),
    defineField({
      name: 'heroImages',
      title: 'Home page photos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Full-screen photos at the top of the home page. More than one becomes a slideshow. Drag to reorder.',
    }),
    defineField({ name: 'heroImage', title: 'Home page photo (old field)', type: 'image', hidden: true }),
    defineField({ name: 'aboutImage', title: 'About page photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'aboutText', title: 'About text', type: 'text', rows: 8 }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'instagram', title: 'Instagram handle', type: 'string', description: 'Without the @.' }),
    defineField({ name: 'based', title: 'Based in', type: 'string', description: 'City, state. Shown small under your name.' }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
});
