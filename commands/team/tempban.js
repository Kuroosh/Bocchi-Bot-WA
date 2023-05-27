async function tempban(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isModerator = await getRang('isModerator', a.sender.id, a.db)
    if (!isModerator) return await b.reply(a.from, eng.modOnly(), a.id)

    if (a.ar.length < 4) return await b.reply(a.from, `Bitte gib einen Grund an!\nMit mindestens 2 Worten!\n\nVerwende:\n${a.prefix}tempban Nummer Dauer Grund\nz.b: ${a.prefix}tempban 4912345 14d Langeweile`, a.id)
    var tmpbanzeit = a.args[1]
    var ablauf = a.helper.getFormattedDateDB(Date.now() + a.toMs(tmpbanzeit))
    var tmpbannnn = ''
    for (let i = 2; i < a.args.length; i++)
        tmpbannnn += a.args[i] + " "
    //Glaube das ist unnötig aktuell...
    /*
        if (a.mentionedJidList.length !== 0) {
        for (let benet of a.mentionedJidList) {
            var isTeam = await getRang('isTeam', benet, a.db)
            if (isTeam) return await b.sendText(a.from, 'Kein TEAM BAN MEHR!')

            if (benet === a.botNumber) return await b.reply(a.from, eng.wrongFormat(), a.id)
            if (benet === a.sender.id) return await b.reply(a.from, `Warum sollte man sich selber bannen?\nDu weißt schon, wenn du gebannt bist *kannst du dich auch nicht entbannen!*\nBist du depri? komm in die Depressed People Gruppe.\nDen Link dazu findest du unter ${a.prefix}og`, a.id)
            //20.04.2023 Banhistory ~Nando
            console.log(ablauf)
            await a.db.add('banhistory', {'id': benet,'permant': 0,'BanZeitpunkt': a.timeDE,'ablauf': ablauf,'grund': tmpbannnn,'ersteller': a.sender.id,'ban': '1','unban': '0'})
            await a.db.add('banned', {'id': benet,'permant': 0,'BanZeitpunkt': a.timeDE,'ablauf': ablauf,'grund': tmpbannnn,'ersteller': a.sender.id})

            await b.sendText(a.from, `Ban ausgeführt!\n\nUser: wa.me/${benet.replace('@c.us', '')}\nGrund: ${tmpbannnn}\nBis wann: ${ablauf}\nLänge des Bans: ${tmpbanzeit}`)
            await b.sendTextWithMentions(a.RegGroupID, `TempBan ausgeführt von @${a.sender.id.replace('@c.us', '')}!\n\nUser: wa.me/${benet.replace('@c.us', '')}\nGrund: ${tmpbannnn}\nBis wann: ${ablauf}\nLänge des Bans: ${tmpbanzeit}`)
        }
    } else */
    {
        var tmpbanid = a.ar[0].replace(/^0+/, '49').replace(/\D/g, '') + '@c.us'
        var isTeam = await getRang('isTeam', tmpbanid, a.db)
        if (isTeam) return await b.sendText(a.from, 'Kein TEAM BAN MEHR!')
        if (tmpbanid === a.botNumber) return await b.reply(a.from, eng.wrongFormat(), a.id)
        if (tmpbanid === a.sender.id) return await b.reply(a.from, `Warum sollte man sich selber bannen?\nDu weißt schon, wenn du gebannt bist *kannst du dich auch nicht entbannen!*\nBist du depri? komm in die Depressed People Gruppe.\nDen Link dazu findest du unter ${a.prefix}og`, a.id)

        await a.db.add('banhistory', { 'id': tmpbanid, 'permant': 0, 'BanZeitpunkt': a.timeDE, 'ablauf': ablauf, 'grund': tmpbannnn, 'ersteller': a.sender.id, 'ban': '1', 'unban': '0' })
        await a.db.add('banned', { 'id': tmpbanid, 'permant': 0, 'BanZeitpunkt': a.timeDE, 'ablauf': ablauf, 'grund': tmpbannnn, 'ersteller': a.sender.id })
        await b.sendText(a.from, `Ban ausgeführt!\n\nUser: wa.me/${tmpbanid.replace('@c.us', '')}\nGrund: ${tmpbannnn}\nBis wann: ${ablauf}\nLänge des Bans: ${tmpbanzeit}`)
        await b.sendTextWithMentions(a.RegGroupID, `TempBan ausgeführt von @${a.sender.id.replace('@c.us', '')}!\n\nUser: wa.me/${tmpbanid.replace('@c.us', '')}\nGrund: ${tmpbannnn}\nBis wann: ${ablauf}\nLänge des Bans: ${tmpbanzeit}`)

    }
}

const helpobj = {
    'command': `tempban`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `tempban _nummer zeit grund_`,
    'permission': 'tempban',
    'description': 'Schließe jemanden temporär von der Botnutzung aus.'
};

module.exports = {
    tempban,
    helpobj
}