async function blocklist(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isModerator = await getRang('isModerator', a.sender.id, a.db)
    if (!isModerator) return await b.reply(a.from, eng.modOnly(), a.id)

    let block = eng.listBlock(a.blockNumber)
    for (let i of a.blockNumber) {
        block += `@${i.replace('@c.us', '')}\n`
    }
    await b.sendTextWithMentions(a.from, block)
}
const helpobj = {
    'command': `blocklist`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `blocklist`,
    'permission': 'blocklist',
    'description': 'Ruft eine Liste der geblockten Nummern auf'
}
module.exports = {
    blocklist,
    helpobj
}