(function() {
  'use strict';

  var listRE = /^(\s*)([*+-]|(\d+)\.)([\w+(\s+\w+)]|[\s*])/,
      emptyListRE = /^(\s*)([*+-]|(\d+)\.)(\s*)$/,
      unorderedBullets = '*+-';

  CodeMirror.commands.newlineAndIndentContinueMarkdownList = function(cm) {
    var pos = cm.getCursor(), tok,
        inList = cm.getStateAfter(pos.line).list || !cm.getStateAfter(pos.line).list,
        match;

    var emptyMatch = cm.getLine(pos.line).match(emptyListRE);

    if (!inList || emptyMatch){
      tok = cm.getTokenAt(pos);
      cm.replaceRange("", {line: pos.line , ch:tok.start}, {line:pos.line , ch:tok.end});
      cm.execCommand('newlineAndIndent');
      return
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

}());
