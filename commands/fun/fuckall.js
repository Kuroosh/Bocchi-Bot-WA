async function fuckall(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    const isEveryoneOn = a.isGroupMsg ? await a.db.groupinfoId('everyone', a.groupId) : false

    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)

    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (!isLeitung && !a.isGroupAdmins) return await b.reply(a.from, eng.adminOnly(), a.id)
    if (isEveryoneOn) return await b.reply(a.from, eng.EveryoneOnAlready(), a.id)
    const groupMemfuck = await b.getGroupMembers(a.groupId)
    cd = 7200000
    timername = 'K_F_S_H'
    const timerFuckall = await a.db.teamContains2('timer', { 'id': a.sender.id, typ: timername })
    if (timerFuckall !== undefined && cd - (Date.now() - timerFuckall) > 0) {
        const time = a.ms(cd - (Date.now() - timerFuckall))
        await b.reply(a.from, eng.daily(time), a.id)
    } else {
        let txtfuck = `╔══✪〘 *🍆💦FUCK💦🍆* 〙✪══\n`
        for (let i = 0; i < groupMemfuck.length; i++) {
            txtfuck += '╠➥'
            txtfuck += `@${a.sender.id.replace(/@c.us/g, '')} fickt @${groupMemfuck[i].id.replace(/@c.us/g, '')}🍆💦\n`
        }
        txtfuck += '╚══✪〘 *B O C C H I* 〙✪══╝'
        await b.sendTextWithMentions(a.from, txtfuck)
        await a.db.removetimer('timer', { 'id': a.sender.id, 'typ': timername })
        await a.daily.addLimit(timername, a.sender.id)
    }
}
const helpobj = {
    'command': `fuckall`,
    'categorie': 'Fun',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `fuckall`,
    'permission': 'foruser',
    'description': 'Habe mit allen Leuten aus der Gruppe Geschlechtsverkehr.'
};

module.exports = {
    fuckall,
    helpobj
}