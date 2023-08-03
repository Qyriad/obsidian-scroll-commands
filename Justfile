dev:
	node esbuild.config.mjs

check:
	oro apply --loglevel=warn
	tsc -noEmit --checkJs --strict

build:
	tsc -noEmit -skipLibCheck
	node esbuild.config.mjs production
