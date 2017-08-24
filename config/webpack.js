// config/webpack.js
 /**
 * Module dependencies
 */

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')

/**
 * A basic Webpack config to use with a Sails app.
 *
 * This config is used by the api/hooks/webpack hook which initializes a
 * Webpack compiler in "watch" mode.
 *
 * See https://webpack.js.org/configuration for a full guide to Webpack config.
 *
 */

module.exports.webpack = {

  /***************************************************************************
  *                                                                          *
  * Create one item in the `entry` dictionary for each page in your app.     *
  *                                                                          *
  ***************************************************************************/
  entry: {
    'pollyfills':'./assets/app/polyfills.ts',
    'vendor':'./assets/app/vendor.ts',
    'app':'./assets/app/main.ts'
  },

  resolve:{
    extensions: ['.ts', '.js']
  },


  /***************************************************************************
  *                                                                          *
  * Output bundled .js files with a `.bundle.js` extension into              *
  * the `.tmp/public/js` directory                                           *
  *                                                                          *
  ***************************************************************************/
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, '..', '.tmp', 'public')
  },

  /***************************************************************************
  *                                                                          *
  * Set up a couple of rules for processing .css and .less files. These will *
  * be extracted into their own bundles when they're imported in a           *
  * JavaScript file.                                                         *
  *                                                                          *
  ***************************************************************************/
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders:[
        {
          loader:'awesome-typescript-loader',
          options:{configFileName:path.resolve(__dirname,'../assets/tsconfig.json')}
        }, 'angular2-template-loader'
        ]
      },
      {
        test:/\.html$/,
        loader: 'raw-loader'
      },
      // Extract less files
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ use: 'css-loader' })
      },
      // Extract less files
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({ use: 'css-loader!less-loader' })
      }
    ],
  },

  /***************************************************************************
  *                                                                          *
  * Set up some plugins to help with Sails development using Webpack.        *
  *                                                                          *
  ***************************************************************************/
  plugins: [

    // This plugin extracts CSS that was imported into .js files, and bundles
    // it into separate .css files.  The filename is based on the name of the
    // .js file that the CSS was imported into.
    new ExtractTextPlugin('styles/[name].bundle.css'),

    // This plugin cleans out your .tmp/public folder before lifting.
    new CleanWebpackPlugin(['public'], {
      root: path.resolve(__dirname, '..', '.tmp'),
      verbose: true,
      dry: false
    }),

    // This plugin copies the `images` and `fonts` folders into
    // the .tmp/public folder.  You can add any other static asset
    // folders to this list and they'll be copied as well.
    new CopyWebpackPlugin([
      {
        from: './assets/images',
        to: path.resolve(__dirname, '..', '.tmp', 'public', 'images')
      },
      {
        from: './assets/fonts',
        to: path.resolve(__dirname, '..', '.tmp', 'public', 'fonts')
      }
    ])
  ]

};
/*
var webpack = require('webpack');
var path = require('path');
var LessPluginCleanCSS = require('less-plugin-clean-css');
var debug = process.env.NODE_ENV === 'development';


var entry = [
  path.resolve(__dirname,'../assets/js/index.js') // set your main javascript file
];

var plugins = [
  //prevents the inclusion of duplicate code into your bundle
  new webpack.optimize.DedupePlugin()
]

if(debug){
  // add this entries in order to enable webpack HMR in browser
  entry.push('webpack/hot/dev-server');
  entry.push('webpack-dev-server/client?http://localhost:3000/');

  plugins.push(new webpack.HotModuleReplacementPlugin({
    multiStep:true
  }));
}else{
  //minify bundle (javascript and css)
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    minimize:true,
    output:{comments: false},
    compress:{drop_console:true}
  }));
}

module.export.webpack = {
  webpack:{
    config:{ //webpack condif start
      entry,
      output:{
        path: path.resolve(__dirname,'../.tmp/public'), // sails.js public path
        filename: 'bundle.js' // or 'bundle-[hash].js'
      },
      debug,
      plugins,
      module:{
        preLoaders:[
          {
            test: /.(jpg|jpeg|png|gif|svg)$/, //minify images using imagemin
            loader: 'image-webpack', // npm install --save image-webpack-loader
            query:{
              bypassOnDebug:true // do not minify when is in develoment mode
            }
          }
        ],
        loaders:[ //not all are necessary, choose wisely
          {
            test: /\.css$/, // load CSS files
            loaders:[
              'style', // npm install --save style-loader
              `css?root=${__dirname}/../assets`, // npm install --save css-loader
              'autoprefixer?browsers=last 2 versions' // npm install --save autoprefixer-loader
            ]
          },
          {
            test: /\.less$/,
            loaders:[
              'style',
              'css',
              'autoprefixer?browsers=last 2 versions',
              'less?sourceMap' // npm install --save less-loader less
            ]
          },
          {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, // load SVG using base64 encode
            loader: 'url?limit=10000&mimetype=image/svg+xml'
          },
          {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, // load font files
            loader: 'url?limit=10000&mimetype=application/font-woff'
          },
          {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, // load TTF font files
            loader: 'url?limit=10000&mimetype=application/octet-stream'
          },
          {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, // load EOT font files
            loader: 'file'
          }
        ]
      },
      lessLoader:{ // config less-loader
        lessPlugin:[
          new LessPluginCleanCSS({advanced: true})
        ]
      },
      imageWebpackLoader:{
        optimizationLevel:6,
        progressive:true,
        interlaced:true,
        pngquant:{
          quality:'69-90',
          speed:4
        },
        svgo:{ //svgo custom options
          plugins:[
            {removeViewBox: false},
            {removeUselessStrokeAndFill:false}
          ]
        }
      }
    }, //webpack config ends here
    develoment:{ //dev server config
      webpack:{ },
      config:{ //webpack-dev-server config
        //this is handy if you are using html5 router
        historyApiFallback:true,
        //set value port as 3000
        //open your browser at http:localhost:3000 instead of http://localhost:1337/
        //for developer and debug your application
        port: 3000,
        // enable Hot Module Replacement with dev-server
        hot:true,
        //sails.js public path
        contentBase: path.resolve(__dirname, '../.tmp/public'),
        //bypass sails.js server
        proxy:{
          '*':{
            target:'http://localhost:1337'
          }
        }
      }
    },
    watchOptions:{
      aggregateTimeout:300
    }
  }
};
*/
