async function leaveid(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isModerator = await getRang('isModerator', a.sender.id, a.db)
    if (!isModerator) return await b.reply(a.from, eng.modOnly(), a.id)

    if (a.isMe) {
        await b.sendText(a.q, 'Ich wurde von einem /ownerbot aufgefordert die Gruppe zu verlassen.\nBye!')
        await a.sleep(2000)
        await b.leaveGroup(a.q)
        await a.db.addGroupinfoMitWert('welcome', { 'id': a.q, 'wert': 0 })
        await a.sleep(5000)
        await b.deleteChat(a.q)
        await b.sendText(a.from, 'Ich habe eine Gruppe verlassen und gelöscht!')
        console.log('Ich habe eine Gruppe verlassen und gelöscht!')
        console.log(a.q)
    }

}
const helpobj = {
    'command': `leaveid`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `leaveid _gruppenid_ _bot-nachricht-markieren_`,
    'permission': 'leaveid',
    'description': 'Lässt den bot die Gruppe passend zur Id verlassen.'
};

module.exports = {
    leaveid,
    helpobj
}