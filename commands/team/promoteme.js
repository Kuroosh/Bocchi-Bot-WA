async function promoteme(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)
    if (a.args.length < 1) return await b.reply(a.from, eng.wrongFormat(), a.id)
    if (!isLeitung) return await b.reply(a.from, eng.leitungOnly(), a.id)
    var promotemeid = a.sender.id
    var promotemegroupid = a.args[0]
    await b.promoteParticipant(promotemegroupid, promotemeid)
    await b.reply(a.from, `Du bist nun ein Admin in dieser Gruppe!`, a.id)
}
//how can i have an alias for an async function in javascript?
const helpobj = {
    'command': `promoteme`,
    'categorie': 'Team',
    'alias': ['pm'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `promoteme _GroupID_`,
    'permission': 'promoteme',
    'description': 'Der Bot gibt dir Admin in der Gruppe deiner Wahl'
};
module.exports = {
    helpobj,
    promoteme,
    pm: promoteme
}
