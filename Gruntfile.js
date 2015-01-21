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
    }
  });

  grunt.registerTask('component-bower', function() {
    var data = grunt.file.read('src/intro.js');
    data += '\n' + grunt.file.read('src/editor.js');
    var header = '(function(global) {';
    var footer = 'global.Editor = Editor;\n})(this);';
    grunt.file.write('editor.js', header + data + footer);
  });

  grunt.registerTask('component-commonjs', function() {
    function findStart(data) {
      var mark = '"use strict";';
      return data.indexOf(mark) + mark.length;
    }
    function stripData(data) {
      data = data.slice(findStart(data));
      data = data.replace(/\}\)\;\s*$/, '');
      return data;
    }

    var base = 'bower_components/codemirror/';

    var codemirror = grunt.file.read(base + 'lib/codemirror.js');
    var end = codemirror.indexOf('return CodeMirror;');

    var data = codemirror.slice(findStart(codemirror), end);
    data += stripData(grunt.file.read(base + 'mode/meta.js'));
    data += stripData(grunt.file.read(base + 'mode/xml/xml.js'));
    data += stripData(grunt.file.read(base + 'mode/markdown/markdown.js'));

    data += '\n' + grunt.file.read('src/intro.js');
    data += '\n' + grunt.file.read('src/editor.js');

    grunt.file.write('index.js', data);
  });

  grunt.registerTask('component-standalone', function() {
    var header = '(function(global) {';
    var footer = 'global.Editor = Editor;\n})(this);';
    var data = grunt.file.read('index.js');
    grunt.file.write('build/editor.js', header + data + footer);
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

  grunt.registerTask('build', ['component-commonjs', 'component-standalone', 'copy']);

  grunt.registerTask('server', ['build', 'connect', 'watch']);

  grunt.registerTask('release', ['component-commonjs', 'component-bower']);

  grunt.registerTask('default', ['server']);
};
