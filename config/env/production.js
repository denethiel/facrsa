/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMysqlServer'
  // },

  /***************************************************************************
   * Set the port in the production environment to 80                        *
   ***************************************************************************/

  // port: 80,

  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/

  // log: {
  //   level: "silent"
  // }

   webpack: {
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
      ]),

      new webpack.optimize.UglifyJsPlugin()
    ]
  }
};
