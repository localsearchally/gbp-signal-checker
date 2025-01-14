const path = require('path');

module.exports = {
  entry: './src/GBPSignalChecker.js',
  output: {
    filename: 'gbp-signal-checker.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'GBPSignalChecker',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      }
    ]
  }
}