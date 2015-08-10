var path = require('path');

module.exports = function(grunt) {
  var pkg = require('./package.json');

  grunt.initConfig({
    pkg: pkg,
    connect: {
      livereload: {
        options: {
          port: 8000,
          middleware: function(connect) {
            return [
              require('connect-livereload')(),
              connect.static(path.resolve('build')),
              connect.directory(path.resolve('build'))
            ];
          }
        }
      },
    },
    watch: {
      editor: {
        files: ['*.css', 'src/*'],
        tasks: ['build'],
        options: {
          livereload: true
        }
      }
    },
    transport: {
      component: {
        options: {
          dest: 'index.js',
          header: '',
          footer: 'module.exports = Editor'
        }
      },
      window: {}
    }
  });

  grunt.registerTask('concat', function() {
    var data = grunt.file.read('vendor/codemirror.js');
    data = data.replace('window.CodeMirror', 'var CodeMirror');
    ['continuelist', 'xml', 'markdown'].forEach(function(name) {
      data += '\n' + grunt.file.read('vendor/' + name + '.js');
    });
    data += '\n' + grunt.file.read('src/intro.js');
    data += '\n' + grunt.file.read('src/editor.js');
    grunt.file.write('tmp/editor.js', data);
  });

  grunt.registerMultiTask('transport', function() {
    var options = this.options({
      src: 'tmp/editor.js',
      dest: 'build/editor.js',
      header: '(function(global) {',
      footer: 'global.Editor = Editor;\n})(this);'
    });
    var data = grunt.file.read(options.src);
    data = [options.header, data, options.footer].join('\n');
    grunt.file.write(options.dest, data);
  });

  grunt.registerTask('copy', function() {
    var dir = 'vendor/icomoon/fonts';
    grunt.file.recurse(dir, function(fpath) {
      var fname = path.relative(dir, fpath);
      grunt.file.copy(fpath, path.join('build', 'fonts', fname));
    });
    var data = grunt.file.read('vendor/icomoon/style.css');
    data += grunt.file.read('paper.css');
    data += grunt.file.read('editor.css');
    grunt.file.write('build/editor.css', data);
    grunt.file.copy('docs/index.html', 'build/index.html');
    grunt.file.copy('docs/markdown.md', 'build/markdown.md');
    grunt.file.copy('docs/markdown.html', 'build/markdown.html');
    grunt.file.copy('docs/yue.css', 'build/yue.css');
    grunt.file.copy('docs/marked.js', 'build/marked.js');
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['concat', 'transport:window', 'copy']);
  grunt.registerTask('server', ['build', 'connect', 'watch']);
  grunt.registerTask('default', ['server']);
};
