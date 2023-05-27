async function oleave(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isModerator = await getRang('isModerator', a.sender.id, a.db)
    if (!isModerator) return await b.reply(a.from, eng.modOnly(), a.id)

    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (a.isMe) {
        await a.sleep(2000)
        await b.sendText(a.from, 'Bye~ 👋')
        await a.sleep(1000)
        await b.leaveGroup(a.groupId)
        await a.db.addGroupinfoMitWert('welcome', { 'id': a.groupId, 'wert': 0 })
        await a.sleep(5000)
        await b.deleteChat(a.groupId)
        console.log('Ich habe eine Gruppe verlassen und gelöscht!')
    }

}
const helpobj = {
    'command': `oleave`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `oleave _bot-nachricht-markieren_`,
    'permission': 'oleave',
    'description': 'Lässt den markierten bot die Gruppe verlassen.'
};

module.exports = {
    oleave,
    helpobj
}