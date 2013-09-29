
build: components index.js editor.css
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

publish:
	@ghp-import build -p

.PHONY: clean
