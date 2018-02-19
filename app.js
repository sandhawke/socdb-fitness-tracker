'use strict'

const data = require('./data')
const domready = require('domready')

const tracker = new data.Data()

domready(createButtons)

tracker.on('change', () => {
  running(tracker.started())
  const out = []
  for (const pg of tracker.list()) {
    out.push(pg)
  }
  const output = document.getElementById('output')
  output.innerHTML = '<pre>' + JSON.stringify(out, null, 2) + '</pre>'
})

window.start  = () => {
  tracker.start()
}

window.stop = () => {
  tracker.stop()
}

function createButtons () {
  const appElem = document.getElementById('app')
  appElem.innerHTML = `
<button type="button" onclick="start()" id="start" disabled="true">Start</button>

<button type="button" onclick="stop()" id="stop" disabled="true">Stop</button>

<div id="output"></div>
`
  running(tracker.started())
}

function running (isRunning) {
  console.log('isRunning = ', isRunning)
  document.getElementById('start').disabled = !!isRunning
  document.getElementById('stop').disabled = !isRunning
}
