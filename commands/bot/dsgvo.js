async function dsgvo(a, b, eng) {
    if (a.isGroupMsg) return await b.reply(a.from, eng.pcOnly(), a.id)
    const verifyResult = await a.db.getId('verify', a.sender.id, 2)

    if (verifyResult.verify == 1) {
        await b.sendText(a.from, eng.datenschutz(), a.id)
        await a.sleep(3000)
        await b.sendText(a.from, `Wenn du einverstanden bist das wir deine Daten speichern, bestätige dies uns bitte mit \n*${a.prefix}verify*`, a.id)

    } else if (verifyResult.verify == 2) {
        await b.sendText(a.from, eng.datenschutz(), a.id)
        await a.sleep(3000)
        await b.sendText(a.from, `Wenn du einverstanden bist das wir deine Daten speichern, bestätige dies uns bitte mit \n*${a.prefix}verify*`, a.id)

    }
    else if (verifyResult.verify == undefined) {
        try {
            await a.db.addNoCatch('verify', { 'id': a.sender.id, 'verify': 1 })
            await b.sendText(a.from, eng.datenschutz(), a.id)
            await a.sleep(3000)
            await b.sendText(a.from, `Wenn du einverstanden bist das wir deine Daten speichern, bestätige dies uns bitte mit \n*${a.prefix}verify*`, a.id)

        } catch (e) {
            console.log(e)
        }
    }
}
const helpobj = {
    'command': `dsgvo`,
    'categorie': 'Bot',
    'alias': ['daten', 'datenschutz'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `dsgvo`,
    'permission': 'foruser',
    'description': 'Sendet eine Datenschutzerklärung von Bocchi.'
};
module.exports = {
    dsgvo,
    daten: dsgvo,
    datenschutz: dsgvo,
    helpobj
}