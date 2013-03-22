# Markdown

----

Markdown is a text formatting syntax inspired on plain text email. In the words of its creator, [John Gruber][]:

> The idea is that a Markdown-formatted document should be publishable as-is, as plain text, without looking like it’s been marked up with tags or formatting instructions.

[John Gruber]: http://daringfireball.net/


## Syntax Guide

### Strong and Emphasize

```
*emphasize*    **strong**
_emphasize_    __strong__
```

**Shortcuts**

- Add/remove bold:

  ⌘-B for Mac / Ctrl-B for Windows and Linux

- Add/remove italic:

  ⌘-I for Mac / Ctrl-I for windows and Linux


### Links

Inline links:

```
[link text](http://url.com/ "title")
[link text](http://url.com/)
<http://url.com>
```

Reference-style links:

```
[link text][id]

    [id]: http://url.com "title"
```

**Shortcuts**

- Add link:

  ⌘-K for Mac / Ctrl-K for Windows and Linux


### Images

Inline images:

```
![alt text](http://path/to/img.jpg "title")
![alt text](http://path/to/img.jpg)
```

Reference-style links:

```
![alt text][id]

    [id]: http://path/to/img.jpg "title"
```

**Shortcuts**

- Add image:

  ⌥-⌘-I for Mac / Alt-Ctrl-I for Windows and Linux


### Headers

Atx-style headers:

```
# h1
## h2
### h3
…
```

Closing # are optional.

```
# h1 #
## h2 ##
…
```


### Lists

Ordered list without paragraphs:

```
1. foo
2. bar
```

Unordered list with paragraphs:

```
* A list item.

  With multiple paragraphs.

* bar
```

You can nest them:

```
* Abacus
  * anser
* Bubbles
  1. bunk
  2. bupkis
     * bar
  3. burper
* Cunning
```

**Shortcuts**

- Add/remove unordered list:

  ⌘-L for Mac / Ctrl-L for Windows and Linux

- Add/remove ordered list:

  ⌥-⌘-L for Mac / Alt-Ctrl-L for Windows and Linux


### Blockquotes

```
> Email-style angle brackets
> are used for blockquotes.

> > And, they can be nested.

> #### Headers in blockquotes
> 
> * You can quote a list.
> * Etc.
```

**Shortcuts**

- Add/remove blockquote:

  ⌘-’ for Mac / Ctrl-’ for Windows and Linux


### Code Spans

```
`<code>` spans are delimited
by backticks.

You can include literal backticks
like `` `this` ``.
```

### Code Blocks

Indent at least 4 spaces or 1 tab.

```
This is a normal paragraph

    this is code block
```


### Horizontal Rules

Three or more dashes for asterisks.

```
---

* * *

- - - - 
```

### Manual Line Breaks

End a line with two or more spaces:

```
Roses are red, [space][space]
Violets are blue. [space][space]
```
