module.exports = ctx => {
  const isDev = ctx.env === 'development';

  return {
    map: isDev ? ctx.map : false,
    plugins: {
      'postcss-import': {},
      'postcss-custom-properties': { preserve: false },
      'postcss-custom-media': {},
      'postcss-nesting': {},
      autoprefixer: {},
      cssnano: isDev ? false : { preset: 'default' },
    },
  };
};
