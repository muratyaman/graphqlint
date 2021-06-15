#!/usr/bin/env node

const { cli } = require('../dist');
process.exit(cli(process.argv), console);
