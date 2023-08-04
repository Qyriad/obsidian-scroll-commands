dev:
	node esbuild.config.mjs

_setup:
	oro apply --loglevel=warn

dev: _setup
	node esbuild.config.mjs

check: _setup
	tsc -noEmit --checkJs --strict

build: _setup
	tsc -noEmit -skipLibCheck
	node esbuild.config.mjs production
