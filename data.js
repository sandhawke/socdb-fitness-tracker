'use strict'

const EventEmitter = require('eventemitter3')
const datapages = require('datapages')
const debug = require('debug')('fitness-data')

class Data extends EventEmitter {
  constructor () {
    super()
    
    const db = new datapages.Remote({address: 'ws://localhost:1978/'}) // window.serverAddress)

    this.active = null
    this.activities = db.view({
      filter: {
        isActivity: true
      },
      sortBy: (a, b) => b.started - a.started
    })
    
    this.activities.on('change', pg => {
      debug('activities changed')
      this.active = null
      const out = []
      for (const pg of this.activities.items()) {
        // todo: and if ME
        if (!this.active && pg.started && !pg.stopped) {
          out.push('ACTIVE:')
          this.active = pg
          console.log('ACTIVE chosen')
        }
        out.push(pg)
        debug('-', JSON.stringify(pg, null, 2))
      }
      debug('ACTIVE ended as', JSON.stringify(this.active, null, 2))
    })
  }

  start () {
    const at = Date()
    this.activities.create({isActivity: true, started: at})
  }

  stop () {
    const a = this.started()
    if (a) {
      a.stopped = Date()
    } else {
      // might just be race condition, so maybe don't take this too
      // seriously
      throw Error('stop() called when nothing was started')
    }
  }

  started () {
    return this.active
  }

  list () {
    return this.activities.items()
  }
}

module.exports.Data = Data
