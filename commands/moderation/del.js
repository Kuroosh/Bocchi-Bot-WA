async function del(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isTeam = await getRang('isTeam', a.sender.id, a.db)

    if (!a.isGroupAdmins && !isTeam) return b.sendText(a.from, eng.adminOnly())
    if (a.isMe) {
        await b.deleteMessage(a.quotedMsgObj.chatId, a.quotedMsgObj.id, false)
        await b.react(a.id, '✅️')
    } else {
        if (!a.isBotGroupAdmins) return b.sendText(a.from, '```Leider ist der Bot kein Admin in dieser Gruppe, daher kann er nur SEINE eigenen Nachrichten löschen.```\n\n_Markiere dazu einfach eine Nachricht, die der *BOT* gesendet hat._')
        try {
            await b.deleteMessage(a.quotedMsgObj.chatId, a.quotedMsgObj.id, false)
            await b.react(a.id, '✅️')
        } catch (err) {
            console.log('DELETEERROR\n' + err)
            await b.sendText(a.from, 'Hier ist ein Fehler aufgetreten.')
        }
    }
}
const helpobj = {
    'command': `del`,
    'categorie': 'Moderation',
    'alias': ['delete'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `delete _Markiere eine Nachricht`,
    'permission': 'foruser',
    'description': 'Löscht die Markierte Nachricht.'
};

module.exports = {
    del,
    delete: del,
    helpobj
}