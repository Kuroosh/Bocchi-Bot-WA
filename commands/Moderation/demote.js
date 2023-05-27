async function demote(a, b, eng) {

    const isRegistered = await a.db.containsId('registered', a.sender.id)

    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)

    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (!a.isGroupAdmins && !isLeitung) return await b.reply(a.from, eng.adminOnly(), a.id)
    if (!a.isBotGroupAdmins) return await b.reply(a.from, eng.botNotAdmin(), a.id)

    var demoteId;
    if (a.quotedMsg) {
        demoteId = a.quotedMsgObj.sender.id
    } else {
        if (!a.mentionedJidList) return await b.reply(a.from, eng.wrongFormat(), a.id)
        if (a.mentionedJidList.length !== 1) return await b.reply(a.from, eng.wrongFormat(), a.id)
        demoteId = a.mentionedJidList[0]
    }
    if (demoteId === a.botNumber) return await b.reply(a.from, eng.wrongFormat(), a.id)
    if (!a.groupAdmins.includes(demoteId)) return await b.reply(a.from, eng.notAdmin(), a.id)
    await b.demoteParticipant(a.groupId, demoteId)
    await b.reply(a.from, `Der genannte User ist nun kein Admin mehr!`, a.id)
}

const helpobj = {
    'command': `demote`,
    'categorie': 'Moderation',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `demote (_@person_ o. _nachricht markieren_)`,
    'permission': 'foruser',
    'description': 'Nimmt der Markierten Person Admin weg.'
};

module.exports = {
    demote,
    helpobj
}
