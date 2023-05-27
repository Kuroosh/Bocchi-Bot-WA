async function leaderboard(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    const isLevelingOn = a.isGroupMsg ? await a.db.groupinfoId('leveling', a.groupId) : false
    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    var engname = 'Leveling'
    if (!isLevelingOn) return await b.reply(a.from, eng.not(engname), a.id)
    if (!a.isGroupMsg) return await b.reply(a.from.eng.groupOnly(), a.id)
    var leader = await a.db.getLeader('level', 'xp', 25); //top 25 ~ Änderung 09.09.2021 Nando
    let leaderboard = '── *「 🏆 RANGLISTE 🏆 」* ──\n\n'
    try {
        for (let i = 0; i < leader.length; i++) {

            var leadername = (await a.db.getId('registered', leader[i].id)).name
            if (a.ar[0] == 'owner') {
                if (!isLeitung) return await b.reply(a.from, eng.leitungOnly(), a.id)
                leaderboard += `${i + 1}. ${leadername}\nwa.me/${leader[i].id.replace('@c.us', '')}\n➸ *XP*: ${leader[i].xp} *Level*: ${leader[i].level}\n\n`
            } else {
                leaderboard += `${i + 1}. ${leadername}\n➸ *XP*: ${leader[i].xp} *Level*: ${leader[i].level}\n\n`
            }
        }
        await b.reply(a.from, leaderboard, a.id)
    } catch (err) {
        console.error(err)
    }

}
const helpobj = {
    'command': `leaderboard`,
    'categorie': 'Leveling',
    'alias': ['lb'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `leaderboard`,
    'permission': 'foruser',
    'description': 'Sendet eine Liste der USer mit den meisten Leveln.'
};
module.exports = {
    leaderboard,
    lb: leaderboard,
    helpobj
}