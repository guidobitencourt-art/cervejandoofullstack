#!/usr/bin/env node
// Launcher CJS que registra ts-node e inicia o servidor TypeScript.
// Usamos um arquivo .cjs para forçar CommonJS mesmo com package.json `type: module`.

require('ts-node/register');

// Importa o entrypoint TypeScript como CommonJS via ts-node
require('../src/server/index.ts');
