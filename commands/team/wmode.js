async function wmode(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)

    if (!isLeitung) return await b.reply(a.from, eng.leitungOnly(), a.id)
    if (a.args[0] == 'enable') {
        await a.db.updateWmode('BetaWmode', true)
        await b.sendText(a.from, `Der Wartungsmodus wurde eingeschaltet.`)
    } else if (a.args[0] == 'disable') {
        await a.db.updateWmode('BetaWmode', false)
        await b.sendText(a.from, `Der Wartungsmodus wurde ausgeschaltet.`)
    } else if (a.args[0] == 'check') {
        const Wmode = await a.db.getFromAllWithWhere('orga', { 'mode': 'BetaWmode' })
        for (let i = 0; i < Wmode.length; i++) {
            try {
                if (Wmode[i].wert == 0) {
                    await b.sendText(a.from, 'Wartungsmodus ist deaktiviert!\n_/wmode enable zum aktivieren_')
                } else if (Wmode[i].wert == 1) {
                    await b.sendText(a.from, 'Wartungsmodus ist aktiviert!\n_/wmode disable zum deaktivieren_')
                }
            } catch (e) {
            }
        }
    }
}
const helpobj = {
    'command': `wmode`,
    'categorie': 'Team',
    'alias': ['wartungsmodus'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `wmode`,
    'permission': `wmode`,
    'description': 'Schaltet den Wartungsmodus an/aus.'
};

module.exports = {
    wmode,
    wartungsmodus: wmode,
    helpobj
}