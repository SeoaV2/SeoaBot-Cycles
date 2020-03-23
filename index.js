const { existsSync, writeFileSync } = require('fs')
const path = require('path').resolve()
const dataRoot = path + '/extensions/Cycles/data/'

if (!existsSync(dataRoot + 'comunity.json')) writeFileSync(dataRoot + 'comunity.json', '["Seoa is the best"]')

const official = require(dataRoot + 'official.json')
const comunity = require(dataRoot + 'comunity.json')
let client, cycle, officialCount, comunityCount

class Cycler {
  constructor (seoa) {
    cycle = 0
    officialCount = 0
    client = seoa
  }

  active () {
    comunityCount = Math.floor(Math.random() * comunity.length)
    setInterval(this.cycler, 3000)
  }

  cycler () {
    cycle++

    if (cycle % 2 < 1) {
      officialCount++
      if (officialCount >= official.length) officialCount = 0
      let { content, type } = official[officialCount]

      content = rander(content)

      client.user.setActivity(content, { type })
    } else {
      client.user.setActivity(comunity[comunityCount])
      comunityCount = Math.floor(Math.random() * comunity.length)
    }
  }

  add (content) {
    comunity.push(content)
  }
}

function rander (string) {
  return string
    .replace('{prefix}', client.prefix)
    .replace('{userCount}', client.users.cache.size)
    .replace('{randomUser}', client.users.cache.random().username)
}

module.exports = Cycler
