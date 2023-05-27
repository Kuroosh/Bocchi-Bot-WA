async function grouplistlow(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isModerator = await getRang('isModerator', a.sender.id, a.db)
    if (!isModerator) return await b.reply(a.from, eng.modOnly(), a.id)

    if (a.args.length < 1) return await b.reply(a.from, `Du musst eine Zahl angeben`, a.id)
    var low = a.args[0]
    var getGroupzgrouplistlow = await b.getAllGroups()
    var txt = 'Grouplist < ' + low
    for (let i = 0; i < getGroupzgrouplistlow.length; i++) {

        var gruppenlinkZlow = null
        if (getGroupzgrouplistlow[i].groupMetadata.participants.filter(
            teilnlow => teilnlow.id._serialized === a.botNumber && teilnlow.isAdmin).length) {
            gruppenlinkZlow = await b.getGroupInviteLink(getGroupzgrouplistlow[i].id)
        }
        gruppenlinkZlow = (gruppenlinkZlow == null) ? 'Kein Admin' : gruppenlinkZlow

        var teilnehmerzahl = getGroupzgrouplistlow[i].groupMetadata.participants.length
        if (teilnehmerzahl >= low) {
        } else {
            await a.sleep(1000)
            txt += `\n\n❏ Name: ${getGroupzgrouplistlow[i].name}\n❏Gruppenid: ${getGroupzgrouplistlow[i].id}\n❏ Unread messages: ${getGroupzgrouplistlow[i].unreadCount} messages\nHier sind unter ${low} Leute Drinne!\n❏ Gruppenlink:\n${gruppenlinkZlow}`
            await a.sleep(1000)
        }
    }
    await b.sendText(a.from, txt + '')
}
const helpobj = {
    'command': `grouplistlow`,
    'categorie': 'Team',
    'alias': ['gl'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `grouplistlow _zahl_`,
    'permission': 'grouplistlow',
    'description': 'Zeigt eine Liste von Gruppen mit der Anzahl an Mitgliedern oder darunter an.'
};

module.exports = {
    grouplistlow,
    gl: grouplistlow,
    helpobj
}