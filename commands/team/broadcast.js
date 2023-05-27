async function broadcast(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isOwner = await getRang('isOwner', a.sender.id, a.db)
    const isRegistered = await a.db.containsId('registered', a.sender.id)

    if (!isOwner) return
    var msg = a.message.body.slice(4)
    const groupList = await b.getAllGroups()
    for (let chat_obj of groupList) {
        var grpid = chat_obj.id
        await a.sleep(250)
        if (!chat_obj.isReadOnly) {
            if (chat_obj.id == '120363038675874425@g.us' || chat_obj.id == '120363039259018408@g.us' || chat_obj.id == '491746583474-1629738018@g.us' || chat_obj.id == '120363022360920817@g.us' || chat_obj.id == '120363042816089505@g.us') {
            } else {
                await b.sendText(grpid, `*── 「 BOCCHI BROADCAST 」 ──*\n\n${msg}`)
            }
        }
        await a.sleep(250)
    }
    await b.sendText(a.from, 'Broadcast Abgeschlossen meine Gottheit!')


}
const helpobj = {
    'command': `broadcast`,
    'categorie': 'Team',
    'alias': ['bc'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `broadcast _text_`,
    'permission': 'broadcast',
    'description': 'Sendet eine Rundnachricht an alle Gruppen.'
};

module.exports = {
    broadcast,
    bc: broadcast,
    helpobj
}
