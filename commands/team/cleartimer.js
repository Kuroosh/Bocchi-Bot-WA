async function cleartimer(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)
    if (!isLeitung) return await b.reply(a.from, eng.leitungOnly(), a.id)

    await a.db.cleartableNoCatch('timer')
    await b.sendText(a.from, '‼Alle Timer wurlalalden gelöscht‼\n_Beinhaltet, Support-Timer, Everyone-Timer und co._')

}
const helpobj = {
    'command': `cleartimer`,
    'categorie': 'Team',
    'alias': ['ct'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `cleartimer `,
    'permission': 'cleartimer',
    'description': 'Löscht die aktuellen Timer einträge (Join, Support, everyone etc.)'
};

module.exports = {
    cleartimer,
    ct: cleartimer,
    helpobj
}