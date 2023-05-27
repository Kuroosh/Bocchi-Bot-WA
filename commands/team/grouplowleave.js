async function grouplowleave(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)
    if (!isLeitung) return await b.reply(a.from, eng.leitungOnly(), a.id)

    if (a.args.length < 1) return await b.reply(a.from, `Du musst eine Zahl angeben`, a.id)
    var lowleave = a.args[0]
    var getGroupzgrouplistlowleave = await b.getAllGroups() // Hole GruppenAnzahl/Anzahl GruppenIDs der offenen Chats
    for (let i = 0; i < getGroupzgrouplistlowleave.length; i++) { //wie gesagt, geht nicht davor
        var teilnehmerzahlleave = getGroupzgrouplistlowleave[i].groupMetadata.participants.length
        if (teilnehmerzahlleave >= lowleave) {
        } else {
            await a.sleep(3000)
            await b.sendText(getGroupzgrouplistlowleave[i].id, `Ich wurde von einem ${a.prefix}ownerbot aufgefordert die Gruppe zu verlassen.\nBye!`)
            await a.sleep(3000)
            await b.leaveGroup(getGroupzgrouplistlowleave[i].id)
            console.log(getGroupzgrouplistlowleave)
            await a.sleep(1000)
            await b.sendText(a.from, `❏ Name: ${getGroupzgrouplistlowleave[i].name} erfolgreich verlassen und gelöscht`)
            await a.sleep(1000)
            await b.deleteChat(getGroupzgrouplistlowleave[i].id)
            console.log(`Ich habe eine Gruppe verlassen und gelöscht! ❏ Name: ${getGroupzgrouplistlowleave[i].name}`)
        }
    }
    await b.sendText(a.from, `Keine Gruppen unter ${lowleave} Member gefunden`)

}
const helpobj = {
    'command': `grouplowleave`,
    'categorie': 'Team',
    'alias': ['glleave'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `grouplowleave _zahl_`,
    'permission': 'grouplowleave',
    'description': 'Lässt den bot alle Gruppen wo Teilnehmer Zahl unter angegebener Zahl ist verlassen.'
};

module.exports = {
    grouplowleave,
    glleave: grouplowleave,
    helpobj
}