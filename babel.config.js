module.exports = {
  "presets": [
    '@vue/app',
    [
      '@babel/preset-env',
      {
        "useBuiltIns": "entry",
        "targets": {
          "chrome": "40",
          "ie": "11"
        },
        "corejs": "3.22",
      }
    ],
  ],
  // "plugins": [
  //  Element按需引入
  //   [
  //     "component",
  //     {
  //       "libraryName": "element-ui",
  //       "styleLibraryName": "theme-chalk"
  //     }
  //   ],
  // ],
}