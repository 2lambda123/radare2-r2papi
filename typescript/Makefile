TSC=node_modules/.bin/tsc

all: node_modules
	$(TSC)
	$(TSC) --declaration r2papi.ts
	$(TSC) -m node16 --target es2020 shell.ts && cp -f shell.js shell.r2.js
	$(TSC) -m node16 --target es2020 esil.ts && cp -f esil.js esil.r2.js
	$(TSC) -m node16 --target es2020 opt.ts && cp -f opt.js opt.r2.js
	$(TSC) -m node16 --target es2020 r2papi.ts && cp -f r2papi.js index.r2.js

pdq: node_modules
	# TODO: use pdq.r2.ts
	$(TSC) -m node16 --target es2020 pdq.ts
	cat pdq.js | sed -e 's,require.*$$,global;,' > pdq.r2.js

PLUGDIR=$(shell r2 -H R2_USER_PLUGINS)

install user-install:
	mkdir -p $(PLUGDIR)
	cp -f pdq.r2.js $(PLUGDIR)

uninstall user-uninstall:
	rm -f $(PLUGDIR)/pdq.qjs

one:
	cat shell.r2.js esil.r2.js base64.r2.js r2pipe.r2.js ai.r2.js r2papi.r2.js pdq.r2.js |grep -v require > one.r2.js
	R2_DEBUG_NOPAPI=1 r2 -i one.r2.js /bin/ls

test:
	R2_DEBUG_NOPAPI=1 r2 -qi index.ts /bin/ls

node_modules:
	mkdir -p node_modules
	npm i

node_modules/jsfmt:
	mkdir -p node_modules
	npm install jsfmt

MODVER=$(shell node -e 'console.log(JSON.parse(require("fs").readFileSync("package.json"))["version"])')

doc:
	npm run doc
	rm -f docs.zip
	zip -r docs.zip docs
	r2 -qc "open docs/index.html" --

webdoc:
	npm run doc
	rm -rf .tmp
	mkdir .tmp
	mv docs .tmp/r2papi
	cd .tmp && tar czvf r2papi.tgz r2papi
	scp .tmp/r2papi.tgz radare.org:doc
	ssh radare.org 'cd doc && tar xzvf r2papi.tgz'
	rm -rf .tmp

npm publish pub:
	${MAKE}
	npm publish

unpublish:
	${MAKE}
	npm unpublish @${MODVER}

r2wip.d.ts:
	sh tsi.sh ij >> r2wip.d.ts
	sh tsi.sh pdj >> r2wip.d.ts
	sh tsi.sh afij >> r2wip.d.ts
	sh tsi.sh abj >> r2wip.d.ts

clean:
	rm *.qjs *.r2.js
