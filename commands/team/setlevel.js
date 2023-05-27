async function setlevel(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isOwner = await getRang('isOwner', a.sender.id, a.db)
    if (!isOwner) return await b.reply(a.from, eng.ownerOnly(), a.id)
    if (a.ar.length < 2 || a.ar.length > 2) return await b.reply(a.from, `An erster Stelle bitte die Nummer, an zweiter Stelle das neue Level.`, a.id)
    if (a.ar[0].includes('@')) return await b.reply(a.from, `Bitte nur die Nummer!`, a.id)
    const ZielNummerLEVEL = a.ar[0].replace(/[ +()-]/g, '') + '@c.us'
    const ZielLEVEL = a.ar[1]
    const userLevel = await a.level.getLevelingLevel(a.ar[0].replace(/[ +()-]/g, '') + '@c.us')
    if (isNaN(ZielLEVEL) == true) {
        await b.reply(a.from, `Folgendes ist keine Zahl: ${ZielLEVEL}`, a.id)
    } else if (isNaN(ZielLEVEL) == false) {
        await a.level.setLevel(ZielNummerLEVEL, ZielLEVEL)
        await b.sendText(a.from, `Die Person wa.me/${ZielNummerLEVEL.replace('@c.us', '')} hat nun das level: ${ZielLEVEL}`)
        await b.sendTextWithMentions(a.RegGroupID, `*── 「 SETLEVEL 」 ──*\n\n@${a.sender.id.replace('@c.us', '')} hat das Level von @${ZielNummerLEVEL.replace('@c.us', '')} auf ${ZielLEVEL} gesetzt`)
        await a.db.add('setlevelhistory', { 'id': ZielNummerLEVEL, 'ersteller': a.sender.id, 'levelzeitpunkt': a.timeDE, 'oldlvl': userLevel, 'newlvl': ZielLEVEL })
    }

}
const helpobj = {
    'command': `setlevel`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `setlevel _nummer level_`,
    'permission': 'setlevel',
    'description': 'Setzt das Level der Nummer.'
};

module.exports = {
    setlevel,
    helpobj
}