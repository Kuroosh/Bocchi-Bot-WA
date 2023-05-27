async function aleaveid(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isModerator = await getRang('isModerator', a.sender.id, a.db)
    if (!isModerator) return await b.reply(a.from, eng.modOnly(), a.id)

    await a.sleep(3000)
    await b.sendText(a.q, `Ich wurde von einem ${a.prefix}ownerbot aufgefordert die Gruppe zu verlassen.\nBye!`)
    await a.sleep(3000)
    await b.leaveGroup(a.q)
    await a.db.addGroupinfoMitWert('welcome', { 'id': a.q, 'wert': 0 })
    await a.sleep(5000) //Ohne Sleep löscht der nicht die Gruppe, beibehalten ++ Sleep 1000 funktioniert, jedoch mit hohen !ping kann sein das er nicht löscht(kein risiko)
    await b.deleteChat(a.q)
    await b.sendText(a.from, 'Ich habe eine Gruppe verlassen und gelöscht!')
    console.log('Ich habe eine Gruppe verlassen und gelöscht!')

}
const helpobj = {
    'command': `aleaveid`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `aleaveid _gruppenid_ `,
    'permission': 'aleaveid',
    'description': 'Lässt alle erreichten Bots die Gruppe passend zur Id verlassen.'
};

module.exports = {
    aleaveid,
    helpobj
}