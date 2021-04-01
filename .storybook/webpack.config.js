const path = require('path');
const postcssPresetEnv = require('postcss-preset-env');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  postcssPresetEnv({})
                ],
              },
            },
          }
        ],
      },
      {
        test: /\.(jpg|jpeg|png|svg|gif)$/,
        loader: 'file-loader',
        options: {
          limit: 1000000,
          name: `statics/images/[name].[ext]`,
        },
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [resolve('../node_modules')],
  },
};
