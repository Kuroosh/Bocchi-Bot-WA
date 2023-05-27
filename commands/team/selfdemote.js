async function selfdemote(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)

    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (!isLeitung) return await b.reply(a.from, eng.leitungOnly(), a.id)
    if (!a.isBotGroupAdmins) return await b.reply(a.from, eng.botNotAdmin(), a.id)
    await b.demoteParticipant(a.groupId, a.sender.id)
    await b.reply(a.from, `Du hast dir selbst den Admin Status entzogen!`, a.id)
}
const helpobj = {
    'command': `selfdemote`,
    'categorie': 'Team',
    'alias': ['sd'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `selfdemote`,
    'permission': 'selfdemote',
    'description': 'Nimmt dir selbst Admin weg.'
};

module.exports = {
    selfdemote,
    sd: selfdemote,
    helpobj
}
