async function grouplink(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isModerator = await getRang('isModerator', a.sender.id, a.db)
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    var gcLink;
    try {
        if (a.isGroupMsg) {
            await b.getGroupInviteLink(a.groupId).then(function (result) {
                gcLink = result
            })
        }
    } catch (err) {
        //
    }
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (!a.isGroupAdmins && !isModerator) return await b.reply(a.from, eng.adminOnly(), a.id)
    if (!a.isBotGroupAdmins) return await b.reply(a.from, eng.botNotAdmin(), a.id)
    await b.sendText(a.from, gcLink)
}
const helpobj = {
    'command': `grouplink`,
    'categorie': 'Moderation',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `grouplink`,
    'permission': 'foruser',
    'description': 'Sendet den Gruppenlink der Gruppe.'
};

module.exports = {
    grouplink,
    helpobj
}
