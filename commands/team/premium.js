async function premium(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isOwner = await getRang('isOwner', a.sender.id, a.db)
    if (!isOwner) return await b.reply(a.from, eng.ownerOnly(), a.id)

    if (a.ar[0] === 'add') {
        if (a.mentionedJidList.length !== 0) {
            for (let prem of mentionedJidList) {
                if (prem === a.botNumber) return await b.reply(a.from, eng.wrongFormat(), a.id)
                a.premium.addPremiumUser(prem, a.args[2])
                await b.reply(a.from, `*── 「 PREMIUM ADDED 」 ──*\n\n➸ *ID*: ${prem}\n➸ *Expired*: ${a.ms(a.toMs(a.args[2])).days} day(s) ${a.ms(a.toMs(a.args[2])).hours} hour(s) ${a.ms(a.toMs(a.args[2])).minutes} minute(s)`, a.id)
            }
        } else {
            a.premium.addPremiumUser(a.args[1] + '@c.us', a.args[2])
            await b.reply(a.from, `*── 「 PREMIUM ADDED 」 ──*\n\n➸ *ID*: ${a.args[1]}@c.us\n➸ *Expired*: ${a.ms(a.toMs(a.args[2])).days} day(s) ${a.ms(a.toMs(a.args[2])).hours} hour(s) ${a.ms(a.toMs(a.args[2])).minutes} minute(s)`, a.id)
        }
    } else if (a.ar[0] === 'del' || a.ar[0] === 'remove') {
        if (a.mentionedJidList.length !== 0) {
            if (a.mentionedJidList[0] === a.botNumber) return await b.reply(a.from, eng.wrongFormat(), a.id)
            await a.db.removeId('premium', a.mentionedJidList[0])
            await b.react(a.message.id, '🫡')
        } else {
            await a.db.removeId('premium', a.args[1] + '@c.us')
            await b.react(a.message.id, '🫡')
        }
    } else {
        await b.reply(a.from, eng.wrongFormat(), a.id)
    }


}
const helpobj = {
    'command': `premium`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `premium _add/remove nummer_`,
    'permission': 'premium',
    'description': 'Fügt bzw entfernt Premium-Status der Nummer.'
};

module.exports = {
    premium,
    helpobj
}
