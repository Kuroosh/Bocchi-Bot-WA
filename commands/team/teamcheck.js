async function teamcheck(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isTeam = await getRang('isTeam', a.sender.id, a.db)
    var isOwner = await getRang('isOwner', a.sender.id, a.db)
    const teamcheckdb = await a.db.getId('team', a.sender.id)
    console.log(teamcheckdb)
    if (!isTeam) return await b.reply(a.from, eng.teamOnly(), a.id)
    if (a.isMe) {
        if (isOwner) {
            let teamcheck = '        -----[ Teamcheck ]----- \n\n'
            teamcheck += `Dein Rang ist ${teamcheckdb.typ}.\n`
            teamcheck += `Dein eingetragener Name ist ${teamcheckdb.name}.\n`
            teamcheck += `Deine eingetragene Email ist:\n${teamcheckdb.email}.\n`
            teamcheck += `Deine eingetragene Ownergruppe ist:\n${teamcheckdb.ogname}\nmit dem Link:\n${teamcheckdb.oglink}\n`
            await b.reply(a.from, `${teamcheck}`, a.id)
        } else {
            let teamcheck = '        -----[ Teamcheck ]----- \n\n'
            teamcheck += `Dein Rang ist ${teamcheckdb.typ}.\n`
            teamcheck += `Dein eingetragener Name ist ${teamcheckdb.name}.\n`
            teamcheck += `Deine eingetragene Email ist:\n${teamcheckdb.email}.\n`
            teamcheck += `Da dein Rang zu niedrig ist hast du keine eingetragene Gruppe!\n`
            await b.reply(a.from, `${teamcheck}`, a.id)
        }
    } else {

    }
}
const helpobj = {
    'command': `teamcheck`,
    'categorie': 'Team',
    'alias': ['tc'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `tc _botnachricht markieren`,
    'permission': 'teamcheck',
    'description': 'Zeigt die aktuellen Teaminformation zu dir an.'
};

module.exports = {
    teamcheck,
    tc: teamcheck,
    helpobj
}