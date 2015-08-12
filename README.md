## Editor

> A markdown editor you really want.


## Overview

Editor is not a WYSIWYG editor, it is a plain text markdown editor with simple and beautiful interface.


## Basic Usage

The easiest way to use Editor is to simply load the script and stylesheet:

```html
<link rel="stylesheet" href="http://lab.lepture.com/editor/editor.css" />
<script type="text/javascript" src="http://lab.lepture.com/editor/editor.js"></script>
<script type="text/javascript" src="http://lab.lepture.com/editor/marked.js"></script>
```

You can also use [jsdelivr CDN](http://www.jsdelivr.com/#!editor):

```html
<link rel="stylesheet" href="//cdn.jsdelivr.net/editor/0.1.0/editor.css">
<script src="//cdn.jsdelivr.net/editor/0.1.0/editor.js"></script>
<script src="//cdn.jsdelivr.net/editor/0.1.0/marked.js"></script>
```

Having done this, an editor instance can be created:

```js
var editor = new Editor();
editor.render();
```

The editor will take the position of the first `<textarea>` element. 

### Get the content

To get back the edited content you use:

```js
editor.codemirror.getValue();
```

## Component

If you are using component, you can install it with:

```
$ component install lepture/editor
```

## NPM

You can also install it via npm:

```
$ npm install md-editor
```

## Development

```
$ npm install
$ node server.js
```


## Configuration

The `Editor` Class accepts an option as the parameter. The supported options are:

* element (DOM)

  The element of the textarea. The default value is the first `<textarea>`.

* tools (array or false)

  If set false, the editor will have no toolbar.

* status (array or false)

  If set false, the editor will have no statusbar.

* actions (object)

* shortcuts (object)


Example:
```JavaScript
new Editor({
  element: document.getElementById('editor'),
  toolbar: []
})
```

## Contributing

Contribution is welcome. As a way to keep all code clean, we use Grunt to build our distributed files. Make sure you have read our [Contributing Guide](./CONTRIBUTING.md).

## License

MIT. Copyright (c) 2013 - 2014 by Hsiaoming Yang
