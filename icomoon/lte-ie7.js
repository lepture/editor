/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-bold' : '&#xe000;',
			'icon-italic' : '&#xe001;',
			'icon-quotes-left' : '&#xe003;',
			'icon-list' : '&#xe004;',
			'icon-numbered-list' : '&#xe005;',
			'icon-link' : '&#xe006;',
			'icon-image' : '&#xe007;',
			'icon-play' : '&#xe008;',
			'icon-music' : '&#xe009;',
			'icon-contract' : '&#xe00a;',
			'icon-expand' : '&#xe00b;',
			'icon-question' : '&#xe00c;',
			'icon-info' : '&#xe00d;',
			'icon-undo' : '&#xe00e;',
			'icon-redo' : '&#xe00f;',
			'icon-code' : '&#xe011;',
			'icon-eye' : '&#xe002;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; i < els.length; i += 1) {
		el = els[i];
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};