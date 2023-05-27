async function shutdown(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)
    if (!isLeitung) return await b.reply(a.from, eng.leitungOnly(), a.id)

    if (!a.isGroupMsg) {
        await b.reply(a.from, 'Neustart ausgeführt~ 👋', a.id)
        await a.sleep(1000)
            .then(async () => await b.kill())
            .catch(() => new Error('Target closed.'))
    } else {
        if (a.isMe) {
            await b.reply(a.from, 'Neustart ausgeführt~ 👋', a.id)
            await a.sleep(1000)
                .then(async () => await b.kill())
                .catch(() => new Error('Target closed.'))
        }
    }
}
const helpobj = {
    'command': `shutdown`,
    'categorie': '',
    'alias': ['sh, neustart'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `shutdown _bot-nachricht-markieren_`,
    'permission': 'shutdown',
    'description': 'Startet den markierten Bot neu.'
};

module.exports = {
    shutdown,
    sh: shutdown,
    neustart: shutdown,
    helpobj
}
