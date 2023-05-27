async function verify(a, b, eng) {
    if (a.isGroupMsg) {
        await b.reply(a.from, eng.pcOnly(), a.id)
        await b.contactUnblock(a.sender.id)
        return
    }
    const verifyResult = await a.db.getId('verify', a.sender.id)
    const isVerify = a.sender.id ? await a.db.getId('verify', a.sender.id) : false
    if (!isVerify) return await b.sendText(a.from, `Lies die DSGVO`)
    if (verifyResult.verify == 1) {
        try {
            await a.db.updateVerify(a.sender.id, 2)
            await b.reply(a.from, 'Herzlichen Glückwunsch! Du bist jetzt verifiziert.', a.id)
        } catch (e) {
            console.log(e)
        }
    } else if (verifyResult.verify == 2) {
        await b.reply(a.from, 'Du bist bereits verifiziert..', a.id)
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
    verify,
    helpobj
}

