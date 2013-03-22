var path = require('path');
var snippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
function folderMount(connect, point) {
  return connect.static(path.resolve(point));
}

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
    },
    connect: {
      livereload: {
        options: {
          port: 8000,
          middleware: function(connect, options) {
            return [snippet, folderMount(connect, 'build')];
          }
        }
      },
    },
    regarde: {
      livereload: {
        files: 'src/*',
        tasks: ['transport', 'livereload']
      }
    },
    generate: {
      seajs: {
        options: {
          header: 'define(function(require, exports, module) {',
          footer: [
            'exports = module.exports = new Editor()',
            'exports.Editor = Editor',
            '});'
          ].join('\n')
        },
        filename: 'cmd/editor.js'
      },
      window: {
        filename: 'js/editor.js'
      }
    }
  });

  grunt.registerTask('concat', function() {
    var data = grunt.file.read('codemirror/codemirror.js');
    data = data.replace('window.CodeMirror', 'var CodeMirror');
    ['overlay', 'xml', 'markdown', 'gfm'].forEach(function(name) {
      data += '\n' + grunt.file.read('codemirror/' + name + '.js');
    });
    data += '\n' + grunt.file.read('src/editor.js');
    grunt.file.write('tmp/editor.js', data);
  });

  grunt.registerMultiTask('generate', function() {
    var options = this.options({
      header: '(function(global) {',
      footer: 'global.Editor = Editor;\n})(this);'
    });
    var data = grunt.file.read('tmp/editor.js');
    data = [options.header, data, options.footer].join('\n');
    grunt.file.write('build/' + this.data.filename, data);
  });

  grunt.registerTask('copy', function() {
    var dir = 'icomoon/fonts';
    grunt.file.recurse(dir, function(fpath) {
      var fname = path.relative(dir, fpath);
      grunt.file.copy(fpath, path.join('build', 'css', 'fonts', fname));
    });
    var data = grunt.file.read('icomoon/style.css');
    data += grunt.file.read('src/paper.css');
    data += grunt.file.read('src/editor.css');
    grunt.file.write('build/css/editor.css', data);
    grunt.file.copy('docs/index.html', 'build/index.html');
    grunt.file.copy('docs/markdown.html', 'build/markdown.html');
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');

  grunt.registerTask('default', ['jshint']);

  grunt.registerTask('server', ['livereload-start', 'connect', 'regarde']);

  grunt.registerTask('transport', ['concat', 'generate', 'copy']);
};
