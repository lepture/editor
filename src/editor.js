define(function(require, exports, module) {

  function Editor(options) {
    this.init(options);
  }

  Editor.prototype.init = function(options) {
    options = options || {};
    if (options.element) {
      this.element = options.element;
    }
    options.tools = options.tools || [
      'bold', 'italic', 'separator',
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

    var editor = CodeMirror.fromTextArea(el, {
      mode: 'gfm',
      theme: 'paper',
      indentWithTabs: true,
      lineNumbers: false,
      extraKeys: keyMaps
    });
    this.editor = editor;

    var bar = this.createToolbar();
    this.createStatusbar();

    // ie < 9 sucks
    if (!bar.classList || !bar.querySelector) return;

    editor.on('cursorActivity', function() {
      var icons = bar.getElementsByTagName('span');

      for (var i = 0; i < icons.length; i++) {
        var el = icons[i];
        el.classList.remove('active');
      }

      var stat = getState(editor);
      for (var key in stat) {
        if (stat[key]) {
          el = document.querySelector('.icon-' + fixIcon(key));
          el.classList.add('active');
        }
      }
    });
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
    var stat = getState(ed);

    var replaceSelection = function(start, end) {
      var pos, text;
      if (stat[name]) {
        pos = ed.getCursor('start');
        text = ed.getLine(pos.line);
        start = text.slice(0, pos.ch);
        end = text.slice(pos.ch);
        if (name === 'bold') {
          start = start.replace(/^(.*)?(\*|\_){2}(\S+.*)?$/, '$1$3');
          end = end.replace(/^(.*\S+)?(\*|\_){2}(\s+.*)?$/, '$1$3');
        } else if (name === 'italic') {
          start = start.replace(/^(.*)?(\*|\_)(\S+.*)?$/, '$1$3');
          end = end.replace(/^(.*\S+)?(\*|\_)(\s+.*)?$/, '$1$3');
        }
        ed.setLine(pos.line, start + end);
        ed.focus();
        return;
      }
      if (end === null) {
        end = '';
      } else {
        end = end || start;
      }
      text = ed.getSelection();
      pos = ed.getCursor('end');
      pos.ch += start.length;
      ed.replaceSelection(start + text + end);
      ed.setCursor(pos);
      ed.focus();
    };

    var toggleLine = function() {
      var pos = ed.getCursor('start');
      var text = ed.getLine(pos.line);

      var map;
      if (stat[name]) {
        map = {
          quote: /^(\s*)\>\s+/,
          'unordered-list': /^(\s*)(\*|\-|\+)\s+/,
          'ordered-list': /^(\s*)\d+\.\s+/
        };
        text = text.replace(map[name], '$1');
        ed.setLine(pos.line, text);
      } else {
        map = {
          quote: '> ',
          'unordered-list': '* ',
          'ordered-list': '1. '
        };
        ed.setLine(pos.line, map[name] + text);
      }
      ed.focus();
    };

    switch (name) {
      case 'bold':
        replaceSelection('**');
        break;
      case 'italic':
        replaceSelection('*');
        break;
      case 'link':
        replaceSelection('[', '](http://)');
        break;
      case 'image':
        replaceSelection('![', '](http://)');
        break;
      case 'quote':
      case 'unordered-list':
      case 'ordered-list':
        toggleLine();
        break;
      case 'undo':
        ed.undo();
        ed.focus();
        break;
      case 'redo':
        ed.redo();
        ed.focus();
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
    icon = fixIcon(icon);
    el = document.createElement('span');
    el.className = 'icon-' + icon;
    return el;
  }

  function getState(ed) {
    var pos = ed.getCursor('start');
    var stat = ed.getTokenAt(pos);
    if (!stat.type) return {};

    var types = stat.type.split(' ');

    var ret = {}, data, text;
    for (var i = 0; i < types.length; i++) {
      data = types[i];
      if (data === 'strong') {
        ret.bold = true;
      } else if (data === 'variable-2') {
        text = ed.getLine(pos.line);
        if (/^\s*\d+\.\s/.test(text)) {
          ret['ordered-list'] = true;
        } else {
          ret['unordered-list'] = true;
        }
      } else if (data === 'atom') {
        ret.quote = true;
      } else if (data === 'em') {
        ret.italic = true;
      }
    }
    return ret;
  }

  function fixIcon(name) {
    var map = {
      quote: 'quotes-left',
      'ordered-list': 'numbered-list',
      'unordered-list': 'list'
    };
    if (map[name]) return map[name];
    return name;
  }

  function toggleFullScreen() {
    // https://developer.mozilla.org/en-US/docs/DOM/Using_fullscreen_mode
    var doc = document;

    var fullscreenElement = doc.fullscreenElement || doc.mozFullScreenElement || doc.webkitFullscreenElement;

    var requestFullscreen = doc.requestFullscreen || doc.mozRequestFullScreen || doc.webkitRequestFullscreen;
  }
});
