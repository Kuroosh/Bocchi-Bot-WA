async function add(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)
    if (!isLeitung) return await b.reply(a.from, eng.leitungOnly(), a.id)

    if (!isLeitung) return await b.reply(a.from, `Dieser Befehl ist zurzeit nicht verfügbar. Bitte mach das Hinzufügen manuell\nDanke!`, a.id)
    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (!a.isGroupAdmins && !isLeitung) return await b.reply(a.from, eng.adminOnly(), a.id)
    if (!a.isBotGroupAdmins) return await b.reply(a.from, eng.botNotAdmin(), a.id)
    try {
        await b.addParticipant(a.from, `${a.q.replace(/[ +()-]/g, '').replace(/^0+/, '49').replace(/\D/g, '')}@c.us`)
        await b.sendText(a.from, '🎉 Welcome! 🎉')
    } catch (err) {
        console.error(err)
        await b.reply(a.from, 'Ich konnte die Person nicht hinzufügen, da entweder die Person bereits in der Gruppe ist, das hinzufügen deaktiviert wurde oder das Format inkorrekt ist!\n\n_Verwende: 49123456 oder +4912 3456_\n\n ```+ - ( ) und leerzeichen werden ignoriert```', a.id)
    }
}
const helpobj = {
    'command': `add`,
    'categorie': 'Moderation',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `add _Nummer_`,
    'permission': 'foruser',
    'description': 'Fügt eine Person wenn möglich in die Gruppe.'
};

module.exports = {
    add,
    helpobj
}