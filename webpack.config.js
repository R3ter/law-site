const path = require('path');

module.exports = {
  entry: './script.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devtool: "#eval-source-map",
  devServer: {
    historyApiFallback: true,
    contentBase:path.join(__dirname,'public')
  },
  module:{
    rules:[
      {
        loader:'babel-loader',
        test:/\.js$/,
        exclude:/node_moudles/
      },{
        test:/\.scss$/,
        exclude:/node_moudles/,
        use:[
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        exclude:/node_moudles/,
        test:/\.(png|jpg)/,
        loader:"file-loader"  
      }
    ]
  }
}