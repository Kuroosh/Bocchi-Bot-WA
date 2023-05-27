async function typechecker(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isTeam = await getRang('isTeam', a.sender.id, a.db)
    if (!isTeam) return await b.reply(a.from, eng.teamOnly(), a.id)
    try {
        var type = a.quotedMsgObj.type
        await b.sendText(a.from, `Die markierte Nachricht hat den Typ: ${type}`)
    } catch (err) {
        await b.reply(a.from, `Du musst eine Nachricht *markieren*, um den Typ der Nachricht zu erfahren!`, a.id)
    }
}
const helpobj = {
    'command': `typechecker`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `typechecker _nachricht markieren_`,
    'permission': `forteam`,
    'description': 'Gibt den typen der markierten Nachricht aus.'
};

module.exports = {
    typechecker,
    helpobj
}