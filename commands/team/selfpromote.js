async function selfpromote(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)

    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (!isLeitung /* && !isGroupOwner */) return await b.reply(a.from, eng.GroupCreatorOnly(), a.id)
    if (!a.isBotGroupAdmins) return await b.reply(a.from, eng.botNotAdmin(), a.id)
    if (a.groupAdmins.includes(a.sender.id)) return await b.reply(a.from, `Du bist bereits ein Admin`, a.id)
    await b.promoteParticipant(a.groupId, a.sender.id)
    await b.reply(a.from, `Du hast dich selbst zu einem Admin ernannt!`, a.id)
}

const helpobj = {
    'command': `selfpromote`,
    'categorie': 'Team',
    'alias': ['sp'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `selfpromote`,
    'permission': 'selfpromote',
    'description': 'Der Bot gibt dir Admin.'
};
module.exports = {
    helpobj,
    selfpromote,
    sp: selfpromote
}
