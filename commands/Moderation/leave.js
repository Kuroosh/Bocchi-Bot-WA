async function leave(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (!a.isGroupAdmins && !isLeitung) return await b.reply(a.from, eng.adminOnly(), a.id)
    await b.sendText(a.from, 'Bye~ 👋')
    await a.sleep(1000)
    await b.leaveGroup(a.groupId)
    await a.db.addGroupinfoMitWert('welcome', { 'id': a.groupId, 'wert': 0 })
    await a.sleep(5000) //Ohne Sleep löscht der nicht die Gruppe, beibehalten ++ Sleep 1000 funktioniert, jedoch mit hohen !ping kann sein das er nicht löscht(kein risiko)
    await b.deleteChat(a.groupId)
    console.log('Ich habe eine Gruppe verlassen und gelöscht!')

}
const helpobj = {
    'command': `leave`,
    'categorie': 'Moderation',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `leave`,
    'permission': 'foruser',
    'description': 'Lässt den Bot die Gruppe verlassen.'
};

module.exports = {
    leave,
    helpobj
}
