## Editor

> A markdown editor you really want.

## Sponsors

Editor is sponsored by [Typlog](https://typlog.com/).

## Overview

Editor is not a WYSIWYG editor, it is a plain text markdown editor. Thanks for the great project [codemirror](http://codemirror.net/), without which editor can never be created.

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
If you are self-hosting the files and want to support the toolbar, you also should download the [icon font file](http://lab.lepture.com/editor/fonts/icomoon.woff) and save it in a sub-folder named `fonts` relative to wherever you have placed the `editor.css` stylesheet

Having done this, an editor instance can be created:

```js
var editor = new Editor();
editor.render();
```

The editor will take the position of the first `<textarea>` element. 

## Interacting with the editor
The editor internally uses [CodeMirror](http://codemirror.net/doc/manual.html) project to render the editor. the CodeMirror object is available via JavaScript as `editor.codemirror`

### Set the editor content

On instantiation, the editor automatically picks up whatever text was present in the `<textarea>` element. To set the content programmatically, use:

```js
editor.codemirror.setValue( "Your content here..." );
```

### Get the content

To get back the edited content you use:

```js
editor.codemirror.getValue();
```

### Refresh the editor view

If your code does something to change the size of the editor element (window resizes are already listened for), or unhides it, you should call refresh function to ensure the editor looks as intended after the sizing/visibility change is complete. For instance, if you have used the editor in a BootStrap Modal dialog, run the refresh function on the `shown.bs.modal` event.

```js
editor.codemirror.refresh();
```

## Component

If you are using component, you can install it with:

    $ component install lepture/editor


## Seajs

If you are using seajs, you can install it with:

```
$ spm install lepture/editor
```

## Development

You can build the dist files with `grunt`. After this repo is cloned, dig into the repo, and install everything you need:

```
$ npm install
$ npm install grunt-cli -g
```

Now you can create the dist files:

```
$ grunt transport
```

You can get everything you need in the `build` directory.


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
