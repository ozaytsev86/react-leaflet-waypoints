module.exports = {
  presets: [
    [
      '@babel/preset-react',
      {
        modules: 'auto',
        runtime: 'automatic',
      }
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-transform-runtime',
    'react-docgen',
  ]
}
