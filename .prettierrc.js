export default {
  // JavaScript Standard Style settings
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'always',

  // Line length
  printWidth: 100,

  // Vue/HTML specific
  vueIndentScriptAndStyle: false,
  htmlWhitespaceSensitivity: 'ignore',

  // Import sorting
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['^node:', '<THIRD_PARTY_MODULES>', '^#', '^@/', '^~/', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
}
