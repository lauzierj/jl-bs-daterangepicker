module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
       options: {
          preserveComments: 'some',
          sourceMap: 'dist/jl-bs-daterangepicker.min.js.map',
          sourceMappingURL: 'jl-bs-daterangepicker.min.js.map',
          report: 'min'
       },
       dist: {
          files: {
             'dist/jl-bs-daterangepicker.min.js': ['src/jl-bs-daterangepicker.js']
          }
       }
     }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['uglify']);
};
