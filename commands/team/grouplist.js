async function grouplist(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isTeam = await getRang('isTeam', a.sender.id, a.db)
    if (!isTeam) return await b.reply(a.from, eng.teamOnly(), a.id)
    var getGroupzgrouplist = await b.getAllGroups() // Hole GruppenAnzahl/Anzahl GruppenIDs der offenen Chats
    let txtGcgrouplist = `── 「 GROUP LIST 」 ──\nALL GROUPS: ${getGroupzgrouplist.length} / ${a.groupLimit}`
    for (let i = 0; i < getGroupzgrouplist.length; i++) {
        var teilnehmerzahl1 = getGroupzgrouplist[i].groupMetadata.participants.length
        var gruppenid = getGroupzgrouplist[i].groupMetadata.id
        txtGcgrouplist += `\n\n❏ Name: ${getGroupzgrouplist[i].name}\n❏ Unread messages: ${getGroupzgrouplist[i].unreadCount} messages\nMit: ` + teilnehmerzahl1 + `Teilnehmer.\n` + gruppenid
    }
    await b.sendText(a.from, txtGcgrouplist)

}

const helpobj = {
    'command': `grouplist`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `grouplist`,
    'permission': 'grouplist',
    'description': 'Zeigt eine Liste mit allen Gruppen.'
};


module.exports = {
    grouplist,
    helpobj
}