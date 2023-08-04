PLUGIN_DIR := ".obsidian/plugins/obsidian-scroll-commands"

_setup:
	oro apply --loglevel=warn

dev: _setup
	node esbuild.config.mjs

check: _setup
	tsc --noEmit --checkJs --strict --noImplicitOverride

build: _setup
	tsc -noEmit -skipLibCheck
	node esbuild.config.mjs production

install VAULT: build
	install main.js -vD --target-directory {{ VAULT }}/{{ PLUGIN_DIR }}
	install manifest.json -vD --target-directory {{ VAULT }}/{{ PLUGIN_DIR }}
