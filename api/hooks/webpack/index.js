/**
 * webpack hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */
var webpack = require('webpack');

module.exports = function defineWebpackHook(sails) {

  return {

    /**
     * Runs when a Sails app loads/lifts.
     *
     * @param {Function} done
     */
    initialize: function (done) {


      // In production mode, just compile the assets and continue lifting Sails.
      if(process.env.NODE_ENV === 'production'){
        return webpack(sails.config.webpack, done);
      }

      //otherwise, create a compiler so that we can watch files
      var compiler = webpack(sails.config.webpack);

      var watcher = compiler.watch({
        // Wait a bit after a change is detected before recompiling,
        // in case other changes come in.
        aggregateTimeout:300,
        // Ignore changes to files in node_modules, even if they're
          // imported by our scripts.
        ignored:/node_modules/
        // poll: true
        // ^^^^^ If native watching isn't working, uncomment the above.
      }, function(err, stats){
        // If the compilation generates errors and we're not already logging all the output from
        // the watcher, log the errors to the console.
        if (stats.hasErrors() && sails.config.log.level !== 'silly' && sails.config.log.level !== 'verbose') {
          sails.log.verbose('Webpack encountered errors while compiling.  Full output:');
          sails.log.error(stats.toString());
        }

        // Otherwise output the result of the compilation.
        else {
          sails.log.verbose('Webpack compiled files and outputted:');
          sails.log.verbose(stats.toString());
        }
      });

      //when Sails lowers, stop watching files.
      sails.on('lower',function(){
        watcher && watcher.close();
      })

      // Be sure and call `done()` when finished!
      // (Pass in Error as the first argument if something goes wrong to cause Sails
      //  to stop loading other hooks and give up.)
      return done();

    }

  };

};
