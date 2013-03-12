module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'src/*.js'
      ],
      options: {
        "eqeqeq": true,
        "forin": false,
        "latedef": false,
        "newcap": true,
        "quotmark": false,
        "undef": false,
        "unused": false,
        "trailing": true,
        "lastsemic": true,
        "asi": false,
        "boss": true,
        "expr": true,
        "strict": false,
        "es5": true,
        "funcscope": true,
        "loopfunc": true,
        "multistr": true,
        "proto": false,
        "smarttabs": true,
        "shadow": false,
        "sub": true,
        "passfail": false,
        "node": true,
        "white": false
      }
    }
  });

  grunt.registerTask('concat', function() {
    var data = grunt.file.read('codemirror/codemirror.js');
    data = data.replace('window.CodeMirror', 'var CodeMirror');
    ['overlay', 'xml', 'markdown', 'gfm'].forEach(function(name) {
      data += grunt.file.read('codemirror/' + name + '.js');
    });
    var editor = grunt.file.read('src/editor.js');
    var text = 'define(function(require, exports, module) {';
    editor = editor.replace(text, '');
    grunt.file.write('tmp/editor.js', text + '\n' + data + editor);
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['jshint']);
};
