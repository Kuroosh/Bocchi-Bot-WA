async function getses(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)
    if (!isLeitung) return await b.reply(a.from, eng.leitungOnly(), a.id)

    const ses = await b.getSnapshot() //const für screenshot web whatsapp
    await b.sendFile(a.from, ses, 'session.png')
    await b.react(a.message.id, '🫡')
}
const helpobj = {
    'command': `getses`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `getses`,
    'permission': 'getses',
    'description': 'Sendet einen Screenshot vom  Bot-Whatsapp.'
};

module.exports = {
    getses,
    helpobj
}
