// @ts-check
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'

import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Prettier integration
  {
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      // Enable Prettier as ESLint rule
      // 'prettier/prettier': 'error',

      '@typescript-eslint/no-extraneous-class': 'off',

      // Disable ESLint formatting rules that conflict with Prettier
      // indent: 'off',
      // 'linebreak-style': 'off',
      // quotes: 'off',
      // semi: 'off',
      // 'comma-dangle': 'off',
      // 'max-len': 'off',
      // 'object-curly-spacing': 'off',
      // 'array-bracket-spacing': 'off',
      // 'computed-property-spacing': 'off',
      // 'space-before-function-paren': 'off',
      // 'keyword-spacing': 'off',
      // 'space-before-blocks': 'off',
      // 'brace-style': 'off',
      // 'no-multiple-empty-lines': 'off',
      // 'padded-blocks': 'off',
      // 'space-in-parens': 'off',
      // 'comma-spacing': 'off',
      // 'key-spacing': 'off',
      // 'no-trailing-spaces': 'off',
      // 'eol-last': 'off',
      // 'arrow-spacing': 'off',
      // 'space-infix-ops': 'off',
      // 'space-unary-ops': 'off',
      // 'operator-linebreak': 'off',
      // curly: 'off',
      // 'nonblock-statement-body-position': 'off'
    }
  },

  // Apply eslint-config-prettier to disable conflicting rules
  eslintConfigPrettier
)
