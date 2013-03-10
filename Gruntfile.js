module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
      options: {
        separator: ';'
      },
      codemirror: {
        src: [
          'codemirror/codemirror.js',
          'codemirror/overlay.js',
          'codemirror/xml.js',
          'codemirror/markdown.js',
          'codemirror/gfm.js'
        ],
        dest: 'dist/codemirror.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
}
