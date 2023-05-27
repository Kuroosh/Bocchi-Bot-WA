async function kickall(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isInhaber = await getRang('Inhaber', a.sender.id, a.db)
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    if (!isRegistered) return await b.reply(from, eng.notRegistered(), id)
    const Justin_Inhaber = "491746583474@c.us"
    const Nando_Inhaber = "491628839189@c.us"
    const Rey_Inhaber = "491747491274@c.us"
    var isGroupOwner;
    try {
        if (a.isGroupMsg) {
            isGroupOwner = a.chat.groupMetadata.owner == a.sender.id
        }
    } catch (err) {
        //
    }
    if (!a.isGroupMsg) return b.reply(a.from, eng.groupOnly(), a.id)
    if (!isGroupOwner && !isInhaber) return b.reply(a.from, eng.GroupCreatorOnly(), a.id)
    if (!a.isBotGroupAdmins) return b.reply(a.from, eng.botNotAdmin(), a.id)
    const allMem = await b.getGroupMembers(a.groupId)
    for (let i = 0; i < allMem.length; i++) {
        if (a.groupAdmins.includes(allMem[i].id) || Justin_Inhaber.includes(allMem[i].id) || Nando_Inhaber.includes(allMem[i].id) || Rey_Inhaber.includes(allMem[i].id)) {
        } else {
            await b.removeParticipant(a.groupId, allMem[i].id)
        }
    }
    b.reply(a.from, 'Erfolgreich alle Entfernt', a.id)


}
const helpobj = {
    'command': `kickall`,
    'categorie': 'Moderation',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `kickall`,
    'permission': 'foruser',
    'description': 'Kickt alle aus der Gruppe (admins ausgenommen).'
};

module.exports = {
    kickall,
    helpobj
}
