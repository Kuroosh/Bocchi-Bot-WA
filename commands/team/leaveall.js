async function leaveall(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isInhaber = await getRang('Inhaber', a.sender.id, a.db)
    if (!isInhaber) return await b.reply(a.from, eng.inhaberOnly(), a.id)

    if (a.isGroupMsg) return await b.reply(a.from, eng.pcOnly(), a.id)
    if (!a.q) return await b.reply(a.from, eng.emptyMess(), a.id)
    const allGroup = await b.getAllGroups()
    for (let gclist of allGroup) {
        await b.sendText(gclist.contact.id, a.q)
        await a.sleep(2500)
        await b.leaveGroup(gclist.contact.id)
        await a.sleep(2500)
        await b.deleteChat(gclist.contact.id)
    }
    await b.react(a.message.id, '🫡')

}
const helpobj = {
    'command': `leaveall`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `leaveall`,
    'permission': 'leaveall',
    'description': 'Verlässt alle Gruppen.'
};

module.exports = {
    leaveall,
    helpobj
}