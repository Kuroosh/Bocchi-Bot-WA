async function statistik(a, b, eng) {
    const blacklistes = await a.db.count('blacklist')
    const allhgvg = await a.db.count('hgvg')
    const premiumuserstats = await a.db.count('premium')
    const alluserstats = await a.db.count('verify')
    const timercount = await a.db.count('timer')

    var hostserror = await a.db.getErrorTrue()
    const allbot = await a.db.countWhere('isBocchiBot', { 'typ': 'BocchiBot' })
    const allgroupsforstats = await a.db.count('groupinfo')
    const alllogsforstats1 = await a.db.count('log2')
    const alllogsforstats = alllogsforstats1 + 3077538
    const bitchesforstats = await a.db.count('testdb')
    const registereduserforstats = await a.db.count('registered')
    const banneduserforstats = await a.db.count('banned')

    await b.sendText(a.from, `╔════ *Statistiken* ════╗\n╠ SessionID: *${a.sessionId}*\n╠ Registrierte User: *${registereduserforstats}*\n╠ Anzahl aller Verifizierten Nutzer: *${alluserstats}*\n╠ Eingetragene Timer: *${timercount}*\n╠ Benutzte Befehle: *${alllogsforstats}*\n╠ Aktive Bots: *${hostserror.length}*\n╠ Aktive Gruppen aller Bots: *${allgroupsforstats}*\n╠ Premium User: *${premiumuserstats}*\n╠ HGVG-Registrierte Gruppen: *${allhgvg}*\n╠ Anzahl gebannter User: *${banneduserforstats}*\n╠ Anzahl von Gruppen auf der Blacklist: *${blacklistes}*\n╠ Anzahl von Gesammelten Porno-Bots: *${bitchesforstats}*\n╚═════════════╝`)
}
const helpobj = {
    'command': `statistik`,
    'categorie': 'Bot',
    'alias': ['stats'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `statistik`,
    'permission': 'foruser',
    'description': 'Sende alle Statistiken über Bocchi.'
};

module.exports = {
    statistik,
    stats: statistik,
    helpobj
}
