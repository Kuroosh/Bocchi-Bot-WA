
async function ban(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isModerator = await getRang('isModerator', a.sender.id, a.db)
    if (!isModerator) return await b.reply(a.from, eng.modOnly(), a.id)

    if (a.ar.length <= 2) return await b.reply(a.from, `Bitte gib einen Grund an!\nMit mindestens 2 Worten!`, a.id)
    if (a.args[0] == 'del' || a.args[0] == 'add') return await b.reply(a.from, `Bitte nutze\n${a.prefix}ban nummer / grund\n${a.prefix}unban nummer`, a.id)
    if (a.mentionedJidList.length !== 0) {
        for (let benet of a.mentionedJidList) {
            var isTeam = await getRang('isTeam', benet, a.db)
            if (isTeam) return await b.sendText(a.from, 'Kein TEAM BAN MEHR!')
            var bannnn = ''
            for (let i = 1; i < a.args.length; i++)
                bannnn += a.args[i] + " "
            if (benet === a.botNumber) return await b.reply(a.from, eng.wrongFormat(), a.id)
            if (benet === a.sender.id) return await b.reply(a.from, `Warum sollte man sich selber bannen?\nDu weißt schon, wenn du gebannt bist *kannst du dich auch nicht entbannen!*\nBist du depri? komm in die Depressed People Gruppe.\nDen Link dazu findest du unter ${a.prefix}og`, a.id)
            await a.db.add('banned', { 'id': benet, 'grund': bannnn, 'ersteller': a.sender.id, })
            //20.04.2023 Banhistory ~Nando
            await a.db.add('banhistory', { 'id': benet, 'grund': bannnn, 'ersteller': a.sender.id, 'ban': '1', 'unban': '0' })

            await b.sendText(a.from, `Ban ausgeführt!\n\nUser: wa.me/${benet.replace('@c.us', '')}\nGrund: ${bannnn}`)
            await b.sendTextWithMentions(a.RegGroupID, `Ban ausgeführt von @${a.sender.id.replace('@c.us', '')}!\n\nUser: wa.me/${benet.replace('@c.us', '')}\nGrund: ${bannnn}`)
        }
    } else {
        var bannnn = ''
        for (let i = 1; i < a.args.length; i++)
            bannnn += a.args[i] + " "
        var bannr = a.ar[0].replace(/^0+/, '49').replace(/\D/g, '') + '@c.us'
        var isTeam = await getRang('isTeam', bannr, a.db)
        if (isTeam) return await b.sendText(a.from, 'Kein TEAM BAN MEHR!')
        await a.db.add('banned', { id: a.ar[0].replace(/^0+/, '49').replace(/\D/g, '') + '@c.us', 'grund': bannnn, 'ersteller': a.sender.id })
        //20.04.2023 Banhistory ~Nando
        await a.db.add('banhistory', { id: a.ar[0].replace(/^0+/, '49').replace(/\D/g, '') + '@c.us', 'grund': bannnn, 'ersteller': a.sender.id, 'ban': '1', 'unban': '0', })

        await b.reply(a.from, `Ban ausgeführt!\n\nUser: wa.me/${bannr}\nGrund: ${bannnn}`, a.id)
        await b.sendTextWithMentions(a.RegGroupID, `Ban ausgeführt von @${a.sender.id.replace('@c.us', '')}!\n\nUser: wa.me/${bannr}\nGrund: ${bannnn}`)
    }
}
const helpobj = {
    'command': `ban`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `ban _Nummer grund_`,
    'permission': 'ban',
    'description': 'Schließt eine Nummer für unbestimmte Zeit aus.'
};

module.exports = {
    ban,
    helpobj
}