# Markdown

----

If you are not familiar with Markdown,  you should spend 15 minutes and go over the excellent [Markdown Syntax Guide](http://daringfireball.net/projects/markdown/syntax) at Daring Fireball. Here is a brief.

## Strong and Emphasize

```
*emphasize*    **strong**
_emphasize_    __strong__
```

## Links and Email

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

Email:

```
<example@email.com>
```

## Images

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

## Headers

```
# h1
## h2
### h3
…
```

```
# h1 #
## h2 ##
…
```

## Lists

Ordered list:

```
1. foo
2. bar
```

Unordered list:

```
* foo
* bar
```

```
- foo
- bar
```

## Blockquotes

```
> blockquote
> > nested blockquote
> ### h3 in blockquote
```

## Inline Code

```
`code` span
```

## Block Code

Indent at least 4 spaces or 1 tab.

```
This is a normal paragraph

    this is code block
```
