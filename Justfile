set dotenv-load

PLUGIN_DIR := ".obsidian/plugins/obsidian-scroll-commands"

_setup:
	oro apply --loglevel=warn

dev: _setup
	node esbuild.config.mjs

check: _setup
	tsc --noEmit --checkJs --strict --noImplicitOverride
	eslint ./src/

build: _setup
	tsc -noEmit -skipLibCheck
	node esbuild.config.mjs production

# You'll need a `.env` file with `VAULT=/some/path/to/your/Obsidian/vault`.
install: build
	install main.js -vD --target-directory $VAULT/{{ PLUGIN_DIR }}
	install manifest.json -vD --target-directory $VAULT/{{ PLUGIN_DIR }}
