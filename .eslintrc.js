module.exports = {
  root: true,
  env: {
    node: true
  },
  rules: {
    'vue/multi-word-component-names': 'off'
  },
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ],
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:prettier/recommended'
  ]
}
