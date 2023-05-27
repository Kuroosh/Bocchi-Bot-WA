async function ping(a, b) {
    try {
        const { processTime } = require('../../tools')
        const moment = require('moment-timezone')
        moment.tz.setDefault('Europe/Berlin').locale('de')
        if (processTime(a.t, moment()) >= 100) return
        await b.reply(a.from, `Pong!\nSession-ID: *[${a.sessionId}]*\nMulti-Device: *[${a.config.multiDevice}]*\nSpeed: ${processTime(a.t, moment())} secs`, a.id)
    } catch (err) {
        console.log(err)
        b.sendText(a.from, "Es ist ein Fehler aufgetreten. t0g3pii arbeitet bereits daran.")
    }
}
const helpobj = {
    'command': `ping`,
    'categorie': 'Bot',
    'alias': ['a', 'p'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `ping`,
    'permission': 'foruser',
    'description': 'Gibt die Botgeschwindigkeit aus.'
};

module.exports = {
    ping,
    a: ping,
    p: ping,
    helpobj
}


// async function pong(a, b) {
// var { getRang } = a.importFresh('../../lib/rang.js')
// var isLeitung = await getRang('isLeitung', a.sender.id, a.db)
// const { color, processTime, isUrl, createSerial } = require('../../tools')
// const moment = require('moment-timezone')
// moment.tz.setDefault('Europe/Berlin').locale('de')
// if (processTime(a.t, moment()) >= 100) return
// if (!isLeitung) {
// await b.reply(a.from, `Ping!\nSpeed: ${processTime(a.t, moment())} secs`, a.id)
// } else if (isLeitung) {
// await b.reply(a.from, `Ping!\nSession-ID: *[${a.sessionId}]*\nMulti-Device: *[${a.config.multiDevice}]*\nSpeed: ${processTime(a.t, moment())} secs`, a.id)
// }
// }

// async function peng(a, b) {
// var { getRang } = a.importFresh('../../lib/rang.js')
// var isLeitung = await getRang('isLeitung', a.sender.id, a.db)
// const { color, processTime, isUrl, createSerial } = require('../../tools')
// const moment = require('moment-timezone')
// moment.tz.setDefault('Europe/Berlin').locale('de')
// if (processTime(a.t, moment()) >= 100) return
// if (!isLeitung) {
// await b.reply(a.from, `Booom!\nSpeed: ${processTime(a.t, moment())} secs`, a.id)
// } else if (isLeitung) {
// await b.reply(a.from, `Booom!\nSession-ID: *[${a.sessionId}]*\nMulti-Device: *[${a.config.multiDevice}]*\nSpeed: ${processTime(a.t, moment())} secs`, a.id)
// }
// }

// async function ping(a, b) {
// try {
// var { getRang } = a.importFresh('../../lib/rang.js')
// var isLeitung = await getRang('isLeitung', a.sender.id, a.db)
// const { processTime } = require('../../tools')
// const moment = require('moment-timezone')
// moment.tz.setDefault('Europe/Berlin').locale('de')
// if (processTime(a.t, moment()) >= 100) return
// if (!isLeitung) {
// await b.reply(a.from, `Pong!\nSpeed: ${processTime(a.t, moment())} secs`, a.id)
// } else if (isLeitung) {
// await b.reply(a.from, `Pong!\nSession-ID: *[${a.sessionId}]*\nMulti-Device: *[${a.config.multiDevice}]*\nSpeed: ${processTime(a.t, moment())} secs`, a.id)
// }
// } catch (err) {
// console.log(err)
// b.sendText(a.from, "Es ist ein Fehler aufgetreten. t0g3pii arbeitet bereits daran.")
// }
// }
// async function p(a, b) {
// try {
// var { getRang } = a.importFresh('../../lib/rang.js')
// var isLeitung = await getRang('isLeitung', a.sender.id, a.db)
// const { processTime } = require('../../tools')
// const moment = require('moment-timezone')
// moment.tz.setDefault('Europe/Berlin').locale('de')
// if (processTime(a.t, moment()) >= 100) return
// if (!isLeitung) {
// await b.reply(a.from, `Pong!\nSpeed: ${processTime(a.t, moment())} secs`, a.id)
// } else if (isLeitung) {
// await b.reply(a.from, `Pong!\nSession-ID: *[${a.sessionId}]*\nMulti-Device: *[${a.config.multiDevice}]*\nSpeed: ${processTime(a.t, moment())} secs`, a.id)
// }
// } catch (err) {
// console.log(err)
// b.sendText(a.from, "Es ist ein Fehler aufgetreten. t0g3pii arbeitet bereits daran.")
// }
// }
// async function a(a, b) {
// try {
// var { getRang } = a.importFresh('../../lib/rang.js')
// var isLeitung = await getRang('isLeitung', a.sender.id, a.db)
// const { processTime } = require('../../tools')
// const moment = require('moment-timezone')
// moment.tz.setDefault('Europe/Berlin').locale('de')
// if (processTime(a.t, moment()) >= 100) return
// if (!isLeitung) {
// await b.reply(a.from, `Pong!\nSpeed: ${processTime(a.t, moment())} secs`, a.id)
// } else if (isLeitung) {
// await b.reply(a.from, `Pong!\nSession-ID: *[${a.sessionId}]*\nMulti-Device: *[${a.config.multiDevice}]*\nSpeed: ${processTime(a.t, moment())} secs`, a.id)
// }
// } catch (err) {
// console.log(err)
// b.sendText(a.from, "Es ist ein Fehler aufgetreten. t0g3pii arbeitet bereits daran.")
// }
// }

// // Ich raste gleich aus AMK.
// // coding convention....
// module.exports = {
// ping, a, p,
// peng,
// pong,
// venoxPing
// } 