define(function(require, exports, module) {

  function Editor(options) {
    this.init(options);
  }

  Editor.prototype.init = function(options) {
    options = options || {};
    if (options.element) {
      this.element = el;
    }
    options.tools = options.tools || [
      'bold', 'italic', 'strikethrough', 'separator',
      'quote', 'unordered-list', 'ordered-list', 'separator',
      'link', 'image', 'separator',
      'undo', 'redo', 'separator',
      'info', 'expand'
    ];
    options.status = options.status || ['lines', 'words', 'cursor'];
    this.options = options;
  };

  Editor.prototype.render = function(el) {
    if (!el) {
      el = this.element || document.getElementsByTagName('textarea')[0];
    }
    this.element = el;

    var self = this;


    var keyMaps;

    if (/Mac/.test(navigator.platform)) {
      keyMaps = {
        'Cmd-B': function(cm) {
          self.action('bold', cm);
        },
        'Cmd-I': function(cm) {
          self.action('italic', cm);
        },
        'Cmd-L': function(cm) {
          self.action('link', cm);
        },
        'Shift-Cmd-S': function(cm) {
          self.action('strikethrough', cm);
        },
        'Shift-Cmd-O': function(cm) {
          self.action('ordered-list', cm);
        },
        'Shift-Cmd-U': function(cm) {
          self.action('unordered-list', cm);
        },
        'Shift-Cmd-I': function(cm) {
          self.action('image', cm);
        }
      };

    } else {
      keyMaps = {
        'Ctrl-B': function(cm) {
          self.action('bold', cm);
        },
        'Ctrl-I': function(cm) {
          self.action('italic', cm);
        },
        'Ctrl-L': function(cm) {
          self.action('link', cm);
        },
        'Shift-Ctrl-S': function(cm) {
          self.action('strikethrough', cm);
        },
        'Shift-Ctrl-O': function(cm) {
          self.action('ordered-list', cm);
        },
        'Shift-Ctrl-U': function(cm) {
          self.action('unordered-list', cm);
        },
        'Shift-Ctrl-I': function(cm) {
          self.action('image', cm);
        }
      };
    }

    this.editor = CodeMirror.fromTextArea(el, {
      mode: 'gfm',
      theme: 'paper',
      indentWithTabs: true,
      lineNumbers: false,
      extraKeys: keyMaps
    });

    this.createToolbar();
    this.createStatusbar();
    initFullScreenApi();
  };

  Editor.prototype.createToolbar = function(tools) {
    tools = tools || this.options.tools;

    if (!tools || tools.length === 0) return;

    var bar = document.createElement('div');
    bar.className = 'editor-toolbar';

    var el, self = this;
    for (var i = 0; i < tools.length; i++) {
      name = tools[i];
      (function(name) {
        el = createIcon(name);
        // bind events
        el.onclick = function() {
          return self.action(name);
        };
        bar.appendChild(el);
      })(tools[i]);
    }
    var editorElement = this.editor.getWrapperElement();
    editorElement.parentNode.insertBefore(bar, editorElement);
    return bar;
  };

  Editor.prototype.createStatusbar = function(status) {
    status = status || this.options.status;

    if (!status || status.length === 0) return;

    var bar = document.createElement('div');
    bar.className = 'editor-statusbar';

    var pos, editor = this.editor;
    for (var i = 0; i < status.length; i++) {
      (function(name) {
        var el = document.createElement('span');
        el.className = name;
        if (name === 'words') {
          el.innerHTML = '0';
          editor.on('update', function() {
            el.innerHTML = editor.getValue().length;
          });
        } else if (name === 'lines') {
          el.innerHTML = '0';
          editor.on('update', function() {
            el.innerHTML = editor.lineCount();
          });
        } else if (name === 'cursor') {
          el.innerHTML = '0:0';
          editor.on('cursorActivity', function() {
            pos = editor.getCursor();
            el.innerHTML = pos.line + ':' + pos.ch;
          });
        }
        bar.appendChild(el);
      })(status[i]);
    }
    var editorElement = this.editor.getWrapperElement();
    editorElement.parentNode.insertBefore(bar, editorElement.nextSibling);
    return bar;
  };

  Editor.prototype.action = function(name, ed) {
    ed = ed || this.editor;
    if (!ed) return;

    var replaceSelection = function(start, end) {
      if (end === null) {
        end = '';
      } else {
        end = end || start;
      }
      var text = ed.getSelection();
      var pos = ed.getCursor('end');
      pos.ch += start.length;
      ed.replaceSelection(start + text + end);
      ed.setCursor(pos);
      ed.focus();
    };

    var replaceLine = function(start) {
      var pos = ed.getCursor('start');
      var text = ed.getLine(pos.line);
      ed.setLine(pos.line, start + text);
      ed.focus();
    };

    switch (name) {
      case 'bold':
        replaceSelection('**');
        break;
      case 'italic':
        replaceSelection('*');
        break;
      case 'strikethrough':
        replaceSelection('~');
        break;
      case 'link':
        replaceSelection('[', '](http://)');
        break;
      case 'image':
        replaceSelection('![', '](http://)');
        break;
      case 'quote':
        replaceLine('> ');
        break;
      case 'unordered-list':
        replaceLine('* ');
        break;
      case 'ordered-list':
        replaceLine('1. ');
        break;
      case 'undo':
        ed.undo();
        ed.focus();
        break;
      case 'redo':
        ed.redo();
        ed.focus();
        break;
      case 'expand':
        toggleFullScreen();
        break;
    }
  };


  exports = module.exports = new Editor();
  exports.Editor = Editor;

  // helpers

  function createIcon(icon) {
    var el;
    if (icon === 'separator') {
      el = document.createElement('i');
      el.className = icon;
      el.innerHTML = '|';
      return el;
    }
    if (icon === 'quote') {
      icon = 'quotes-left';
    } else if (icon === 'ordered-list') {
      icon = 'numbered-list';
    } else if (icon === 'unordered-list') {
      icon = 'list';
    }
    el = document.createElement('span');
    el.className = 'icon-' + icon;
    return el;
  }

  function toggleFullScreen() {
    if(window.fullScreenApi.isFullScreen()){
      window.fullScreenApi.cancelFullScreen(document.getElementsByTagName('body')[0]);
    }else{
      window.fullScreenApi.requestFullScreen(document.getElementsByTagName('body')[0]);
    }
  }

  function initFullScreenApi() {
    var fullScreenApi = {
        supportsFullScreen: false,
        isFullScreen: function() { return false; },
        requestFullScreen: function() {},
        cancelFullScreen: function() {},
        fullScreenEventName: '',
        prefix: ''
      },
      browserPrefixes = 'webkit moz o ms khtml'.split(' ');

    // check for native support
    if (typeof document.cancelFullScreen != 'undefined') {
      fullScreenApi.supportsFullScreen = true;
    } else {
      // check for fullscreen support by vendor prefix
      for (var i = 0, il = browserPrefixes.length; i < il; i++ ) {
        fullScreenApi.prefix = browserPrefixes[i];

        if (typeof document[fullScreenApi.prefix + 'CancelFullScreen' ] != 'undefined' ) {
          fullScreenApi.supportsFullScreen = true;
          break;
        }
      }
    }

    // update methods to do something useful
    if (fullScreenApi.supportsFullScreen) {
      fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';

      fullScreenApi.isFullScreen = function() {
        switch (this.prefix) {
          case '':
            return document.fullScreen;
          case 'webkit':
            return document.webkitIsFullScreen;
          default:
            return document[this.prefix + 'FullScreen'];
        }
      };
      fullScreenApi.requestFullScreen = function(el) {
        return (this.prefix === '') ? el.requestFullScreen() : el[this.prefix + 'RequestFullScreen']();
      };
      fullScreenApi.cancelFullScreen = function(el) {
        return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + 'CancelFullScreen']();
      }
    }
    this.fullScreenApi = fullScreenApi;
  }
});
