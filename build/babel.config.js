module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: false,
        modules: 'commonjs'
      }
    ],
    [
      '@vue/babel-preset-jsx',
      {
        functional: false
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: true,
        regenerator: false,
        useESModules: false
      }
    ],
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: false,
        decoratorsBeforeExport: true
      }
    ]
  ]
}