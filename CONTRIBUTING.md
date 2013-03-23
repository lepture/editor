# Contributing

There are more than one way to contribute, and I will appreciate any way you choose.

- tell your friends about lepture/editor, let lepture/editor to be known
- discuss editor, and submit bugs with github issues
- send patch with github pull request

English and Chinsese issuses are acceptable, but English is prefered.

Pull request and git commit message only accept English, if your commit message is in other language, it will be rejected.


## Codebase

The codebase of editor is highly linted, as a way to keep all code written in a particular style for readability. You should follow the code style.

A little hint to make things simple:

- when you cloned this repo, run ``npm install``
- check the code style with ``grunt jshint``

## Grunt

If you haven't installed `grunt` yet, grab the command line:

```
$ npm install grunt-cli -g
```

Create a livereload server for your development:

```
$ grunt server
```

And open your browser at `http://localhost:8000`.

The source code is in `src`.

## Git Help

Something you should know about git.

- don't add any code on the master branch, create a new one
- don't add too many code in one pull request, you can't add too many features in one pull request

Hint of git:

```
$ git branch [featurename]
$ git checkout [featurename]
```
