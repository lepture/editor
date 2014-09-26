const listRE = /^(\s*)([*+-]|(\d+)\.)([\w+(\s+\w+)]|[\s*])/,
    emptyListRE = /^(\s*)([*+-]|(\d+)\.)(\s*)$/,
    unorderedBullets = '*+-';

var inListState = function(cm, pos){
  return cm.getStateAfter(pos.line).list || null;
};

var inListOrNot = function(cm){
  var pos = cm.getCursor();
  return inListState(cm, pos);
};

CodeMirror.commands.shiftTabAndIndentContinueMarkdownList = function(cm){
  var inList = inListOrNot(cm);

  if(inList !== null){
    cm.execCommand('insertTab');
    return;
  }

  cm.execCommand('indentLess');
};

CodeMirror.commands.tabAndIndentContinueMarkdownList = function(cm){
  var inList = inListOrNot(cm);

  if(inList !== null){
    cm.execCommand('insertTab');
    return;
  }

  cm.execCommand('indentMore');
};

CodeMirror.commands.newlineAndIndentContinueMarkdownList = function(cm){
  var pos, tok, match, emptyMatch, inList;

  pos = cm.getCursor();
  tok = cm.getTokenAt(pos);
  emptyMatch = cm.getLine(pos.line).match(emptyListRE);
  inList = inListState(cm, pos);

  if (!inList && emptyMatch){
    cm.replaceRange("", {line: pos.line , ch:tok.start}, {line:pos.line , ch:tok.end});
    cm.execCommand('delLineLeft');
    cm.execCommand('newlineAndIndent');
    return;
  }

  if (!inList || !(match = cm.getLine(pos.line).match(listRE))) {
    cm.execCommand('newlineAndIndent');
    return;
  }

  var indent = match[1], after = " ";
  var bullet = unorderedBullets.indexOf(match[2]) >= 0
      ? match[2]
      : (parseInt(match[3], 10) + 1) + '.';

  cm.replaceSelection('\n' + indent + bullet + after, 'end');
};
