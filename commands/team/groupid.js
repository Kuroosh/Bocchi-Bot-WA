async function groupid(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isTeam = await getRang('isTeam', a.sender.id, a.db)
    if (!isTeam) return b.reply(a.from, eng.adminOnly(), a.id)

    var checkgroupid;
    if (!a.ar[0]) {
        checkgroupid = a.from
        await b.reply(a.from, a.from + '', a.id)
    } else {
        checkgroupid = a.q
        const gcInfo3 = await b.inviteInfo(checkgroupid) //Gruppenbeschreibung
        await b.reply(a.from, gcInfo3.groupMetadata.id + '', a.id)
    }
}
const helpobj = {
    'command': `groupid`,
    'categorie': 'Team',
    'alias': ['grpid, gid'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `groupid _gruppenlink_`,
    'permission': 'groupid',
    'description': 'Sendet die GruppenId von dem Link.'
};
module.exports = {
    groupid,
    grpid: groupid,
    gid: groupid,
    helpobj
}