'use strict'

const datapages = require('datapages')
const domready = require('domready')

domready(createButtons)

const db = new datapages.Remote(window.serverAddress)

const activities = db.view({
  filter: {
    isActivity: true
  },
  sortBy: (a, b) => b.started - a.started
})

let active

function display () {
  console.log('display')
  const output = document.getElementById('output')

  activities.on('change', pg => {
    console.log('activities:')
    active = null
    const out = []
    for (const pg of activities.items()) {
      // todo: and if ME
      if (!active && pg.started && !pg.stopped) {
        out.push('ACTIVE:')
        active = pg
        console.log('ACTIVE chosen')
      }
      out.push(pg)
      console.log('-', JSON.stringify(pg, null, 2))
    }
    console.log('ACTIVE ended as', JSON.stringify(active, null, 2))
    running(active)
    output.innerHTML = '<pre>' + JSON.stringify(out, null, 2) + '</pre>'
  })

  /*
  activities.listenSince(0, 'change', async (pg, delta) => {
    console.log('pg', pg, delta)

    // which ones are us?   
    //    _owner is the device from datapages
    //    we want the underlying social identity
    // which ones are still open?
    
    let elem 
    if (pg.__elem) {
      elem = pg.__elem
    } else {
      // is there a race condition here, if this callback gets called
      // with a second even before we set this flag up?  Shouldn't be,
      // because document.createElement is synchronous.
      elem = document.createElement('div')
      pg.__elem = elem
      output.appendChild(elem)
    }
    let x = ''
    if (pg.started && pg.stopped === undefined) {
      active = pg
      x = 'ACTIVE' // and set the others NOT TO BE
    }
    elem.innerHTML='<pre>' + JSON.stringify(pg, null, 2) + pg.started + '</pre>' + x
    console.log('pg.started=', pg.started)
    if (active) running(true)
  })
  */
}

window.start  = () => {
  console.log('start')
  // running(true) // should really come from DB
  const at = Date()
  activities.create({isActivity: true, started: at})
}

window.stop = () => {
  console.log('stop')
  // running(false)
  active.stopped = Date()
  active = null
}

function createButtons () {
  const appElem = document.getElementById('app')
  appElem.innerHTML = `
<button type="button" onclick="start()" id="start" disabled="true">Start</button>

<button type="button" onclick="stop()" id="stop" disabled="true">Stop</button>

<div id="output"></div>
`
  // running(false)
  console.log('calling display')
  display()
}

function running (isRunning) {
  console.log('isRunning = ', isRunning)
  document.getElementById('start').disabled = !!isRunning
  document.getElementById('stop').disabled = !isRunning
}
