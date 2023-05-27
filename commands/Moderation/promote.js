async function promote(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)

    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (!a.isGroupAdmins && !isLeitung) return await b.reply(a.from, eng.adminOnly(), a.id)
    if (!a.isBotGroupAdmins) return await b.reply(a.from, eng.botNotAdmin(), a.id)

    var promoteId;
    if (a.message.quotedMsg) {
        promoteId = a.quotedMsgObj.sender.id
    } else {
        if (!a.mentionedJidList) return await b.reply(a.from, eng.wrongFormat(), a.id)
        if (a.mentionedJidList.length !== 1) return await b.reply(a.from, eng.wrongFormat(), a.id)
        promoteId = a.mentionedJidList[0]
    }
    if (promoteId === a.botNumber) return await b.reply(a.from, eng.wrongFormat(), a.id)
    if (a.groupAdmins.includes(promoteId)) return await b.reply(a.from, eng.adminAlready(), a.id)
    await b.promoteParticipant(a.groupId, promoteId)
    await b.reply(a.from, `Der genannte User ist nun ein Admin!`, a.id)
}
const helpobj = {
    'command': `promote`,
    'categorie': 'Moderation',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `promote _@Nummer_`,
    'permission': 'foruser',
    'description': 'Ernennt eine neue Person zum Administrator.'
};

module.exports = {
    promote,
    helpobj,
}

