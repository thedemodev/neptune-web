const path = require('path');

module.exports = ({ config }) => {
  config.module.rules = config.module.rules.filter(f => f.test.toString() !== '/\\.css$/');

  config.module.rules.unshift({
    test: /\.module\.css$/,
    include: path.resolve(__dirname, '../src/'),
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: true,
        },
      },
    ],
  });

  config.module.rules.push({
    test: /\.less$/,
    include: path.resolve(__dirname, '../src/'),
    use: ['style-loader', 'css-loader', 'less-loader'],
  });

  config.module.rules.push({
    test: /\.css$/,
    exclude: [/node_modules(?!\/@storybook\/addon-info)/, /\.module\.css$/],
    use: ['style-loader', 'css-loader'],
  });

  config.module.rules.unshift({
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
    },
  });

  config.externals = { bootstrap: true };

  console.log(config.module);

  return config;
};
