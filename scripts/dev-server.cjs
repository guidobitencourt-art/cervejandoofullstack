#!/usr/bin/env node
// Launcher CJS que inicia o entrypoint TypeScript usando o loader ESM do ts-node.
// Isso evita o erro ERR_REQUIRE_ESM quando package.json inclui "type": "module".

const { spawn } = require('child_process')
const path = require('path')

const entry = path.join(__dirname, '..', 'src', 'server', 'index.ts')

// Prefer ts-node-dev (devDependency) because it handles ESM/TS well in dev.
// Fallback to ts-node/esm loader if ts-node-dev isn't available.
const tsNodeDevBin = path.join(__dirname, '..', 'node_modules', '.bin', 'ts-node-dev')

function runWithTsNodeDev(onFailure) {
	const args = ['--respawn', '--transpile-only', '--esm', entry]
	const child = spawn(tsNodeDevBin, args, { stdio: 'inherit', shell: true })
	child.on('close', code => {
		if (code === 0) process.exit(0)
		console.warn('ts-node-dev exited with code', code)
		if (typeof onFailure === 'function') return onFailure(code)
		process.exit(code)
	})
	child.on('error', err => {
		console.error('Failed to start ts-node-dev process', err)
		if (typeof onFailure === 'function') return onFailure(1)
		process.exit(1)
	})
}

function runWithNodeLoader() {
	const nodeArgs = ['--loader', 'ts-node/esm', '--enable-source-maps', entry]
	const child = spawn(process.execPath, nodeArgs, { stdio: 'inherit' })
	child.on('close', code => process.exit(code))
	child.on('error', err => {
		console.error('Failed to start node with ts-node/esm loader', err)
		process.exit(1)
	})
}

// Try ts-node-dev; if it fails (non-zero exit), fallback to npx then to ts-node/esm loader.
runWithTsNodeDev((code) => {
	console.warn('Attempting fallback via `npx ts-node-dev`')
	const npx = spawn('npx', ['ts-node-dev', '--respawn', '--transpile-only', '--esm', entry], { stdio: 'inherit', shell: true })
	npx.on('close', c => {
		if (c === 0) return process.exit(0)
		console.warn('npx ts-node-dev also failed with code', c, ', falling back to node+ts-node/esm')
		runWithNodeLoader()
	})
	npx.on('error', () => {
		console.warn('npx failed to start, falling back to node+ts-node/esm')
		runWithNodeLoader()
	})
})
