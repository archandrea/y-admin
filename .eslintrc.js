module.exports = {
  root: true,
  parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    'vue/max-attributes-per-line': [2, {
      'singleline': 10,
      'multiline': 1,
    }],
    'vue/html-indent': 'off',
    'vue/attributes-order': 'off',
    'vue/html-self-closing': 'off',
    'vue/valid-v-for': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/name-property-casing': 'off',
    'vue/no-v-html': 'off',
    'vue/no-mutating-props': 'off',
    'vue/require-v-for-key': 'off',
    'eqeqeq': 'off',
    'no-console': 'off',
    'no-empty': 'off',
    'no-multiple-empty-lines': 'off',
    'no-trailing-spaces': 'off',
    'no-unused-vars': 'off',
    'vue/no-unused-vars': 'off',
    'no-useless-escape': 'off',
    'space-before-function-paren': 'off',
    'spaced-comment': 'off',
    'prefer-const': 'off',
    'no-debugger': 'off',
  }
}
