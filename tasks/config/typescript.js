module.exports = function(grunt){
  grunt.config.set('ts', {
    default: {
      src:["assets/app/**/*.ts","!node_modules/**"],
      outDir:".tmp/public/app/",
      options:{
        module: "commonjs",
        moduleResolution:"node",
        sourceMap: true,
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        lib:['es2015','dom'],
        noImplicitAny: true,
        suppressExcessPropertyErrors: true
      },
      watch:"."
    }
  })
  grunt.loadNpmTasks('grunt-ts')
}