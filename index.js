const { existsSync, writeFileSync } = require('fs')
const path = require('path').resolve()
const dataRoot = path + '/extensions/Cycles/data/'

if (!existsSync(dataRoot + 'community.json')) writeFileSync(dataRoot + 'community.json', '[{"content":"Seoa is the best","author":""}]')

const official = require(dataRoot + 'official.json')
const community = require(dataRoot + 'community.json')
let client, cycle, officialCount, communityCount

class Cycler {
  constructor (seoa) {
    cycle = 0
    officialCount = 0
    client = seoa
  }

  active () {
    setInterval(this.cycler, 5000)
  }

  cycler () {
    cycle++

    if (cycle % 2 < 1) {
      officialCount++
      if (officialCount >= official.length) officialCount = 0
      let { content, type } = official[officialCount]

      content = render(content)

      client.user.setActivity(content, { type })
    } else {
      communityCount = Math.floor(Math.random() * community.length)
      client.user.setActivity(community[communityCount].content)
    }
  }

  add (content, author) {
    community.push({ content, author })
    this.save()
  }

  delete (num, author) {
    const ii = []
    const dd = community.filter((d, i) => {
      if (d.author === author) {
        ii.push(i)
        return true
      } else return false
    })
    if (!dd[num]) return false

    community.splice(ii[num], 1)
    this.save()

    return true
  }

  get (author) {
    if (!author) return community
    else return community.filter((data) => data.author === author)
  }

  save () {
    writeFileSync(dataRoot + 'community.json', JSON.stringify(community))
  }
}

function render (string) {
  return string
    .replace('{prefix}', client.prefix)
    .replace('{userCount}', client.users.cache.size)
    .replace('{randomUser}', client.users.cache.random().username)
}

module.exports = Cycler
