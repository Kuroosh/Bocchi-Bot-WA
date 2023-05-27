async function spenden(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isOwner = await getRang('isOwner', a.sender.id, a.db)

    var spendenid = a.args[1] + '@c.us'
    var spendenbetrag = a.args[2]
    if (a.args[0] == 'add') {
        if (!isOwner) return await b.reply(a.from, eng.ownerOnly(), a.id)
        await a.db.updatespendenId({ 'id': spendenid, 'betrag': spendenbetrag })
        await b.sendText(a.from, `Erfolgreich in Spenden Tabelle aktualisiert`)
    } else {
        const registereduserSpenden = await a.db.count('registered')
        await b.reply(a.from, eng.spendentext(registereduserSpenden), a.id)
    }
}
const helpobj = {
    'command': `spenden`,
    'categorie': 'Team',
    'alias': ['donation', 'donate'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `spenden add _Nr_ _Betrag_`,
    'permission': 'spenden',
    'description': 'Schreibt einen Spender in die SpendenListe'
};

module.exports = {
    spenden,
    donation: spenden,
    donate: spenden,
    helpobj,
}