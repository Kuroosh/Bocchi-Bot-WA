async function group(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isTeam = await getRang('isTeam', a.sender.id, a.db)
    var getGroupzgroup = await b.getAllGroups()
    if (!isTeam) return await b.reply(a.from, eng.teamOnly(), a.id)
    let chatzt = []
    chatzt = await b.getAllChatIds(true) // offene chats

    if ((getGroupzgroup.length - 3) >= a.groupLimit) {
        await b.sendText(a.from, `── 「 GRUPPEN ZÄHLER 」 ──\n[${a.sessionId}]\n\nAktive Gruppen: *${getGroupzgroup.length - 3} / ${a.groupLimit}* \nOffene Chats: *${chatzt.length}*\nMemberlimit: *${a.memberLimit}*\n\n*_Ich nehme keine weiteren Gruppen mehr an_*`)
    } else {
        await b.sendText(a.from, `── 「 GRUPPEN ZÄHLER 」 ──\n[${a.sessionId}]\n\nAktive Gruppen: *${getGroupzgroup.length - 3} / ${a.groupLimit}* \nOffene Chats: *${chatzt.length}*\nMemberlimit: *${a.memberLimit}*`)
    }


}
const helpobj = {
    'command': `group`,
    'categorie': 'Team',
    'alias': ['groups'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `group`,
    'permission': 'group',
    'description': 'Sendet eine Nachricht mit der Anzahl der erreichten Bots.'
};

module.exports = {
    group,
    groups: group,
    helpobj
}
