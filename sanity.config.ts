import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemaTypes';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';

// Studio layout: Site settings is a single document; galleries are a list.
export default defineConfig({
  name: 'default',
  title: 'Juan Briseno',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('Price list')
              .id('pricing')
              .child(S.document().schemaType('pricing').documentId('pricing')),
            S.divider(),
            S.documentTypeListItem('gallery').title('Galleries'),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (prev) => prev.filter((t) => !['siteSettings', 'pricing'].includes(t.schemaType)),
  },
  document: {
    actions: (prev, { schemaType }) =>
      ['siteSettings', 'pricing'].includes(schemaType)
        ? prev.filter(({ action }) => !['unpublish', 'delete', 'duplicate'].includes(action ?? ''))
        : prev,
  },
});
