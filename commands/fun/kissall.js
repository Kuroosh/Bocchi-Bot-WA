async function kissall(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    const isEveryoneOn = a.isGroupMsg ? await a.db.groupinfoId('everyone', a.groupId) : false

    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)

    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (!isLeitung && !a.isGroupAdmins) return await b.reply(a.from, eng.adminOnly(), a.id)
    if (isEveryoneOn) return await b.reply(a.from, eng.EveryoneOnAlready(), a.id)
    const groupMemkiss = await b.getGroupMembers(a.groupId)
    cd = 7200000
    timername = 'K_F_S_H'
    const timerKissall = await a.db.teamContains2('timer', { 'id': a.sender.id, typ: timername })
    if (timerKissall !== undefined && cd - (Date.now() - timerKissall) > 0) {
        const time = a.ms(cd - (Date.now() - timerKissall))
        await b.reply(a.from, eng.daily(time), a.id)
    } else {
        let txtkiss = `╔══✪〘 *KÜSSEN* 〙✪══\n`
        for (let i = 0; i < groupMemkiss.length; i++) {
            txtkiss += '╠➥'
            txtkiss += `@${a.sender.id.replace(/@c.us/g, '')} küsst @${groupMemkiss[i].id.replace(/@c.us/g, '')}😘\n`
        }
        txtkiss += '╚══✪〘 *B O C C H I* 〙✪══╝'
        await b.sendTextWithMentions(a.from, txtkiss)
        await a.db.removetimer('timer', { 'id': a.sender.id, 'typ': timername })
        await a.daily.addLimit(timername, a.sender.id)
    }
}
const helpobj = {
    'command': `kissall`,
    'categorie': 'Fun',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `kissall`,
    'permission': 'foruser',
    'description': 'Küsse jeden aus der Gruppe.'
};

module.exports = {
    kissall,
    helpobj
}