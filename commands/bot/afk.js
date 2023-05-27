async function afk(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)

    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    const isAfkOn = a.isGroupMsg ? await a.afk.checkAfkUser(a.sender.id) : false
    var engname = 'AFK'
    if (isAfkOn) return await b.reply(a.from, eng.alreadyon(engname), a.id)
    const reason = a.q ? a.q : eng.afkNoreason()
    await a.afk.addAfkUser(a.sender.id, a.time, reason)
    await b.reply(a.from, eng.afkOn(a.username, reason), a.id)

}
const helpobj = {
    'command': `afk`,
    'categorie': 'Bot',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `afk _grund_`,
    'permission': 'foruser',
    'description': 'Setzt dich AFK.'
};

module.exports = {
    afk,
    helpobj
}
