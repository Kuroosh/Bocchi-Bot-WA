async function spam(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)

    if (!isLeitung) return await b.reply(a.from, eng.leitungOnly(), a.id)
    const spamsay1 = a.q.substring(0, a.q.indexOf('|'))
    const spamsay2 = a.q.substring(a.q.lastIndexOf('|') + 2)
    var counter = spamsay1
    var text = spamsay2
    for (i = 0; i < counter; i++) {
        await b.sendTextWithMentions(a.from, `${text}`)
    }
}
const helpobj = {
    'command': `spam`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `spam _anzahl_ | _text_`,
    'permission': 'spam',
    'description': 'Spammt eine Nachricht so oft wie DU willst..'
};

module.exports = {
    spam,
    helpobj
}