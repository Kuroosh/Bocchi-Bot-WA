async function unregister(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    if (a.isGroupMsg) return await b.reply(a.from, eng.pcOnly(), a.id)
    if (!isRegistered) return await b.reply(a.from, `Du bist noch Nicht registriert!`, a.id)
    if (a.args[0] === 'confirm') {
        await a.db.removeId('registered', a.sender.id)
        await b.sendText(a.from, `Registrierung gelöscht`)
    } else {
        await b.sendText(a.from, `Bitte bestätige mit ${a.prefix}unregister confirm\nNur deine Registrierung wird gelölscht(Name/Alter)\n_Premium und level bleiben erhalten_`)
    }


}
const helpobj = {
    'command': `unregister`,
    'categorie': 'Bot',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `unregister`,
    'permission': 'foruser',
    'description': 'Lösche deine Registrierung bei uns.\n_Nur Name und Alter_'
};

module.exports = {
    unregister,
    helpobj
}
