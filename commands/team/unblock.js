async function unblock(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isTeam = await getRang('isTeam', a.sender.id, a.db)
    if (!isTeam) return await b.reply(a.from, eng.teamOnly(), a.id)
    const teamcheckdb = await a.db.getId('team', a.sender.id)

    if (a.mentionedJidList.length !== 0) {
        for (let blok of a.mentionedJidList) {
            if (blok === a.botNumber) return await b.reply(a.from, eng.wrongFormat(), a.id)
            await b.contactUnblock(blok)
        }
        await b.reply(a.from, eng.doneTeam(teamrang), a.id)
    } else if (a.args.length === 1) {
        await b.contactUnblock(a.q.replace(/[ +()-]/g, '').replace(/\D/g, '') + '@c.us')
        await b.reply(a.from, eng.doneTeam(teamcheckdb.typ, teamcheckdb.name), a.id)
    } else {
        await b.reply(a.from, eng.wrongFormat(), a.id)
    }
}
const helpobj = {
    'command': `unblock`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `unblock _@person_`,
    'permission': `unblock`,
    'description': 'Gibt ein Person wieder frei.'
};

module.exports = {
    unblock,
    helpobj
}