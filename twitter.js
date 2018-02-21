'use strict'

const domready = require('domready')

function init (db) {
  domready(start)

  async function start () {
    const div = document.createElement('div')
    div.style = 'float:right; border: 6px solid blue; padding: 1em; '
    document.body.insertBefore(div, document.body.firstChild)

    if (window.twitterInfo) {
      const reply = await db.rawClient.transport.ask('claimTwitter', window.twitterInfo)
      window.location.href = reply
      return
    }

    await db.waitForSession()
    // console.log('got sessionData', db.sessionData)
    console.log('or sessionData', db.rawClient.transport.sessionData)
    const id = db.rawClient.transport.sessionData.id

    const v = db.view({
      filter: { isTwitterAuth: true,
                sessionID: id,
                twitterUserName: { exists: true } }
    })

    v.on('appear', pg => {
      console.log('got user name!', pg)
      div.innerHTML = '@' + pg.twitterUserName + ' <button onclick="logout()">unlink</button>'
    })
    v.on('disappear', pg => {
      console.log('lost user name!', pg)
      div.innerHTML = '<a href="twitter/authorize">Link With Twitter</a>'
    })
    div.innerHTML = '<a href="twitter/authorize">Link With Twitter</a>'

    window.logout = async () => {
      console.log('logout')
      const reply = await db.rawClient.transport.ask('claimTwitter', 'logout')
      window.location.href = reply
      return
    }
  }
}

module.exports.init = init
