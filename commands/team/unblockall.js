async function unblockall(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)
    if (!isLeitung) return await b.reply(a.from, eng.leitungOnly(), a.id)
    for (let i of a.blockNumber) {
        await b.contactUnblock(i)
    }
    await b.sendText(a.from, `Erfolgreich ${a.blockNumber.length} Nummer/n freigegeben`)
}
const helpobj = {
    'command': `unblockall`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `unblockall`,
    'permission': `unblockall`,
    'description': 'Gibt Alle User frei.'
};

module.exports = {
    unblockall,
    helpobj
}