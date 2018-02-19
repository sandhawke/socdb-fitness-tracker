'use strict'

const data = require('./data')
const tracker = new data.Data()

async function f() {
  await list()
  tracker.start()
  await list()
  tracker.stop()
  await list()
}

function list() {
  setTimeout(() => {
    console.log('Activities:')
    for (const pg of tracker.list()) {
      console.log('-', pg)
    }
  }, 200)
}

f()
