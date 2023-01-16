module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    'no-unused-expressions': 'off',
    'no-unused-vars': ['off'],
    'vue/no-irregular-whitespace': 'error',
    'vue/match-component-file-name': ['error', {
      extensions: ['vue'],
      shouldMatchCase: false
    }],
    'vue/multi-word-component-names': 'error',
    'vue/valid-define-emits': 'off'
  }
}
