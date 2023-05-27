async function ounregister(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)
    if (!isLeitung) return await b.reply(a.from, eng.leitungOnly(), a.id)
    var unregisterowner = a.args[0] + '@c.us'
    if (a.args[1] === 'confirm') {
        await a.db.removeId('registered', unregisterowner)
        await b.sendText(a.from, `Registrierung gelöscht`)
    } else {
        await b.sendText(a.from, `Bitte bestätige mit ${a.prefix}unregister confirm\nNur deine Registrierung wird gelölscht(Name/Alter)\n_Premium und level bleiben erhalten_`)
    }
}
const helpobj = {
    'command': `ounregister`,
    'categorie': 'Bot',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `ounregister _nummer_`,
    'permission': 'ounregister',
    'description': 'Lösche die Registrierung der Nummer bei uns.\n_Nur Name und Alter_'
};

module.exports = {
    ounregister,
    helpobj
}
