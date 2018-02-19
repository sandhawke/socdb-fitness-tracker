#!/usr/bin/env node   
'use strict'  //  -*-mode: javascript -*- 

const argv = require('minimist')(process.argv.slice(2));
const data = require('./data')
const tracker = new data.Data()

const cmd = argv._.shift()

if (cmd === 'start') {
  tracker.start()
} else if (cmd === 'stop') {
  setTimeout(() => {
    tracker.stop()
  }, 200)
} else if (cmd === 'list') {
  // how long to wait for it to settle?   use on('stable') ?
  setTimeout(() => {
    console.log('Activities:')
    for (const pg of tracker.list()) {
      console.log('- ', JSON.stringify(pg, null, 2))
    }
  }, 200)
} else {
  console.error('arg should be "start", "stop", or "list"')
}

setTimeout(() => {
  process.exit()
}, 300)
