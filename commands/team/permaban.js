async function permaban(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isInhaber = await getRang('Inhaber', a.sender.id, a.db)
    if (!isInhaber) return await b.reply(a.from, eng.inhaberOnly(), a.id)

    var bannr = a.ar[0].replace(/^0+/, '49').replace(/\D/g, '') + '@c.us'
    var isTeam = await getRang('isTeam', bannr, a.db)
    if (isTeam) return await b.sendText(a.from, 'Kein TEAM BAN MEHR!')
    const teamcheckdb = await a.db.getId('team', a.sender.id)
    var bannnn = ''
    for (let i = 1; i < a.args.length; i++)
        bannnn += a.args[i] + " "
    //20.04.2023 Banhistory ~Nando
    await a.db.add('banhistory', { id: bannr, 'grund': bannnn, 'ersteller': a.sender.id, 'BanZeitpunkt': a.timeDE, 'ban': '1', 'unban': '0' })

    await a.db.add('banned', { id: bannr, 'grund': bannnn, 'ersteller': a.sender.id, 'BanZeitpunkt': a.timeDE })
    await b.react(a.message.id, '☑️')
    await b.sendTextWithMentions(a.RegGroupID, `Ban ausgeführt von @${a.sender.id.replace('@c.us', '')}!\n\nUser: wa.me/${bannr.replace('@c.us', '')}\nGrund: ${bannnn}`)
    try {
        await a.db.addNoCatch('testdb', { id: bannr, 'bot': '0' })
        await b.reply(a.from, eng.doneTeam(teamcheckdb.typ, teamcheckdb.name), a.id)
    } catch (err) {
        await b.reply(a.from, `Nummer ist bereits in der Blacklist eingetragen.`, a.id)
    }
}
const helpobj = {
    'command': `permaban`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `permaban _nummer grund_`,
    'permission': 'permaban',
    'description': 'Schließt die Nummer permanent aus allen Bocchigruppen aus.'
};

module.exports = {
    permaban,
    helpobj
}