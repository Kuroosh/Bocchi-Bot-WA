async function usertodo(a, b, eng) {
    try {
        await a.db.addNoCatch('todo', { 'senderid': a.sender.id, 'text': a.q, 'team': 'false' })
        await b.reply(a.from, `UserTodo erfolgreich in Liste geschrieben.`, a.id)
    } catch (e) {
        await b.reply(a.from, `*── 「 UserTodo 」 ──*\nDiese Todo existiert bereits!❌`, a.id)
    }
}
const helpobj = {
    'command': `usertodo`,
    'categorie': 'Bot',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `usertodo _Vorschlag_`,
    'permission': 'foruser',
    'description': 'Sende deinen Vorschlag direkt an uns in die Datenbank.'
};

module.exports = {
    usertodo,
    helpobj
}