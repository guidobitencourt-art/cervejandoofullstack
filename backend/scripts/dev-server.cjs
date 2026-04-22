#!/usr/bin/env node
// Dev launcher for backend: uses ts-node transpile-only register and requires the TS entry.
try {
  require('ts-node/register/transpile-only')
} catch (err) {
  console.error('Please install ts-node as a dev dependency in backend: npm install -D ts-node')
  process.exit(1)
}

require('../src/index.ts')
