const pluginSortImports = require('@ianvs/prettier-plugin-sort-imports');
const pluginTailwindcss = require('prettier-plugin-tailwindcss');

/** @type {import('prettier').Config} */
module.exports = {
  endOfLine: 'lf',
  semi: true,
  tabWidth: 2,
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'none',
  importOrder: [
    '^next',
    '^react',
    '^zod',
    '',
    '^@/styles',
    '',
    '^@/components',
    '',
    '^@/lib',
    '',
    '^@/hooks',
    '',
    '^@/actions',
    '',
    '^[./]'
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  plugins: [
    {
      parsers: {
        typescript: {
          ...pluginSortImports.parsers.typescript,
          parse: pluginTailwindcss.parsers.typescript.parse
        }
      }
    }
  ]
};
