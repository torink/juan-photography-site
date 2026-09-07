import { defineField, defineType } from 'sanity';

export const pricing = defineType({
  name: 'pricing',
  title: 'Price list',
  type: 'document',
  fields: [
    defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 3, description: 'Optional. A sentence or two above the packages.' }),
    defineField({
      name: 'packages',
      title: 'Packages',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'package',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'price', title: 'Price', type: 'string', description: 'Free text, e.g. $1,800 or From $450' }),
            defineField({ name: 'summary', title: 'One-line summary', type: 'string' }),
            defineField({ name: 'includes', title: 'What is included', type: 'array', of: [{ type: 'string' }], description: 'One item per line.' }),
          ],
          preview: { select: { title: 'name', subtitle: 'price' } },
        },
      ],
    }),
    defineField({ name: 'note', title: 'Fine print', type: 'text', rows: 3, description: 'Optional. Travel, deposits, turnaround, anything else.' }),
  ],
  preview: { prepare: () => ({ title: 'Price list' }) },
});
