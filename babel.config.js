module.exports = {
  presets: [
    ['@babel/env', {
      corejs: 3,
      useBuiltIns: 'usage',
    }],
    ['@babel/react', {
      runtime: 'automatic',
      importSource: 'react',
    }],
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', {
      corejs: 3,
    }],
  ],
};
