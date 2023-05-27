async function banlist(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isModerator = await getRang('isModerator', a.sender.id, a.db)
    if (!isModerator) return await b.reply(a.from, eng.modOnly(), a.id)

    var ban = await a.db.getFromAll('banned')
    var banid = await a.db.getAll('banned', 'id')
    var bangrund = await a.db.getAll('banned', 'grund')
    var banersteller = await a.db.getAll('banned', 'ersteller')
    var bantime = await a.db.getAll('banned', 'time')
    const banneduserBanlist = await a.db.count('banned')

    var bans = `── *「  BANLIST  」* ──\nInsgesamt gebannte User: ${banneduserBanlist}\n\n`;
    ban.forEach(e => bans += `Id: wa.me/${e.id.replace('@c.us', '')}\nGrund:${e.grund}\nErsteller: wa.me/${e.ersteller.replace('@c.us', '')}\nUhrzeit: ${e.BanZeitpunkt}\n\n`);

    // var banids = '';
    // banid.forEach(e => banids += e + '\n');

    // var bangrunds = '';
    // bangrund.forEach(e => bangrunds += e + '\n');

    // var banerstellers = '';
    // banersteller.forEach(e => banerstellers += e + '\n');

    // var bantimes = '';
    // bantime.forEach(e => bantimes += e + '\n');

    // console.log('ALLES')
    // console.log(bans)
    // console.log('IDS')
    // console.log(banids)
    // console.log('Grund')
    // console.log(bangrunds)
    // console.log('Ersteller')
    // console.log(banerstellers)
    // console.log('time')
    // console.log(bantimes)
    await b.reply(a.from, bans, a.id)
    // await b.reply(from, banids, id)
    // await b.reply(from, bangrunds, id)
    // await b.reply(from, banerstellers, id)
    // await b.reply(from, bantimes, id)

}
const helpobj = {
    'command': `banlist`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `banlist`,
    'permission': 'banlist',
    'description': 'Ruft die liste der aktuell ausgeschlossenen Nummern auf.'
};

module.exports = {
    banlist,
    helpobj
}