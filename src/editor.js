define(function(require, exports, module) {

  function Editor(el) {
    this.element = el;
    // this.info = 'markdown.html';
  }

  Editor.prototype.render = function(el, tools) {
    if (!el) {
      el = this.element || document.getElementsByTagName('textarea')[0];
    }
    this.element = el;

    if (tools !== null) {
      this.createToolbar(tools);
    }

    this.editor = CodeMirror.fromTextArea(el, {
      mode: 'gfm',
      theme: 'paper',
      indentWithTabs: true,
      lineNumbers: false
    });
  }

  Editor.prototype.createToolbar = function(tools) {
    tools = tools || [
      'bold', 'italic', 'strikethrough', 'separator',
      'quote', 'unordered-list', 'ordered-list', 'separator',
      'link', 'image', 'separator',
      'undo', 'redo', 'separator',
      'info', 'expand'
    ];

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
        }
        bar.appendChild(el);
      })(tools[i]);
    }
    el = this.element;
    el.parentNode.insertBefore(bar, el);
    return bar;
  }

  Editor.prototype.action = function(name) {
    var ed = this.editor;
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
    }
  }


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
    // https://developer.mozilla.org/en-US/docs/DOM/Using_fullscreen_mode
    var doc = document;

    var fullscreenElement = doc.fullscreenElement || doc.mozFullScreenElement || doc.webkitFullscreenElement;

    var requestFullscreen = doc.requestFullscreen || doc.mozRequestFullScreen || doc.webkitRequestFullscreen;
  }
});
