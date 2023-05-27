async function grouplistlink(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)

    if (a.isMe) {
        if (!isLeitung) return await b.reply(a.from, eng.leitungOnly(), a.id)
        var getGroupzgrouplistlink = await b.getAllGroups() // Hole GruppenAnzahl/Anzahl GruppenIDs der offenen Chats
        let txtGcgrouplistlink = `── 「 GROUP LIST 」 ──\nALL GROUPS: ${getGroupzgrouplistlink.length} / ${a.groupLimit}`
        var first = true;
        for (let i = 0; i < getGroupzgrouplistlink.length; i++) {
            console.log(getGroupzgrouplistlink[i].groupMetadata)
            var teilnehmerzahl = getGroupzgrouplistlink[i].groupMetadata.participants.length
            var gruppenlinkZ = null
            if (getGroupzgrouplistlink[i].groupMetadata.participants.filter(
                teiln => teiln.id._serialized === a.botNumber && teiln.isAdmin).length) {
                gruppenlinkZ = await b.getGroupInviteLink(getGroupzgrouplistlink[i].id)
            }
            gruppenlinkZ = (gruppenlinkZ == null) ? 'Kein Admin' : gruppenlinkZ
            txtGcgrouplistlink += `\n\n❏ Name: ${getGroupzgrouplistlink[i].name}\n❏ Unread messages: ${getGroupzgrouplistlink[i].unreadCount} messages\nMit:` + teilnehmerzahl + `Teilnehmer.\n` + gruppenlinkZ
            if (i % 14 == 0 && !first) {
                await b.sendText(a.from, txtGcgrouplistlink);
                txtGcgrouplistlink = `── 「 GROUP LIST 」 ──\nALL GROUPS: ${getGroupzgrouplistlink.length} / ${a.groupLimit}`
            }
            first = false;
        }
        if (getGroupzgrouplistlink.length % 14 !== 0) {
            await b.sendText(a.from, txtGcgrouplistlink)
        }
    }
}
const helpobj = {
    'command': `grouplistlink`,
    'categorie': 'Team',
    'alias': ['gllink'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `grouplistlink _bot-nachricht-markieren_`,
    'permission': 'grouplistlink',
    'description': 'Sendet eine Liste mit Links aller Gruppen.'
};

module.exports = {
    grouplistlink,
    gllink: grouplistlink,
    grouplinklist: grouplistlink,
    helpobj
}