async function addme(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)
    if (!isLeitung) return await b.reply(a.from, eng.leitungOnly(), a.id)
    try {
        addme = a.args[0]
        await b.addParticipant(addme, a.sender.id)
        await b.sendText(a.from, '🎉 Ich habe dich hinzugefügt! 🎉')
        await b.sendTextWithMentions(addme, `🎉 Teammitglied @${a.sender.id} hat sich hinzugefügt! 🎉\n\nWillkommen  ${a.pushname}`)
    } catch (err) {
        console.error(err)
        await b.reply(a.from, 'Ich konnte die Person nicht hinzufügen, da entweder die Person bereits in der Gruppe ist, das hinzufügen deaktiviert wurde oder das Format inkorrekt ist!\n\n_Verwende: 49123456 oder +4912 3456_\n\n ```+ - ( ) und leerzeichen werden ignoriert```', a.id)
    }
}
const helpobj = {
    'command': `addme`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `addme _gruppenid_`,
    'permission': 'addme',
    'description': 'Fügt dich in die Gruppe hinzu.\n\n*⚠VORSICHT BANGEFAHR 50%⚠*'
};

module.exports = {
    addme,
    helpobj
}