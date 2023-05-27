async function howmuch(a, b, eng) {
    var howmuch = await a.db.countWhere('log', { 'userid': a.sender.id })
    await b.reply(a.from, `Du hast ${howmuch} Befehle ausgeführt!`, a.id)
}
const helpobj = {
    'command': `howmuch`,
    'categorie': 'Bot',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `howmuch`,
    'permission': 'foruser',
    'description': 'Sieh wie viele Befehle du ausgeführt hast.'
};
module.exports = {
    howmuch,
    helpobj
}