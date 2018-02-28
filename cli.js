#!/usr/bin/env node
const index = require('./index')
const parameters = require('yargs')
  .command('$0 [file]', 'explore')
  .argv
index(parameters.file)
