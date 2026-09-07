import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string', description: 'One short line under your name.' }),
    defineField({
      name: 'heroImage',
      title: 'Home page photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Full-screen photo at the top of the home page.',
    }),
    defineField({ name: 'aboutImage', title: 'About page photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'aboutText', title: 'About text', type: 'text', rows: 8 }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'instagram', title: 'Instagram handle', type: 'string', description: 'Without the @.' }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
});
