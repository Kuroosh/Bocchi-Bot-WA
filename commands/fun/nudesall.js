async function nudesall(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    const isEveryoneOn = a.isGroupMsg ? await a.db.groupinfoId('everyone', a.groupId) : false

    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)

    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (!isLeitung && !a.isGroupAdmins) return await b.reply(a.from, eng.adminOnly(), a.id)
    if (isEveryoneOn) return await b.reply(a.from, eng.EveryoneOnAlready(), a.id)
    const groupMemnudes = await b.getGroupMembers(a.groupId)
    cd = 7200000
    timername = 'K_F_S_H'
    const timerNudesall = await a.db.teamContains2('timer', { 'id': a.sender.id, typ: timername })
    if (timerNudesall !== undefined && cd - (Date.now() - timerNudesall) > 0) {
        const time = a.ms(cd - (Date.now() - timerNudesall))
        await b.reply(a.from, eng.daily(time), a.id)
    } else {
        let txtnudes = `╔══✪〘 *💦📷NUDES📷💦* 〙✪══\n`
        for (let i = 0; i < groupMemnudes.length; i++) {
            txtnudes += '╠➥'
            txtnudes += `@${a.sender.id.replace(/@c.us/g, '')} fragt @${groupMemnudes[i].id.replace(/@c.us/g, '')} nach Nudes😘💦🍆📷\n`
        }
        txtnudes += '╚══✪〘 *B O C C H I* 〙✪══╝'
        await b.sendTextWithMentions(a.from, txtnudes)
        await a.db.removetimer('timer', { 'id': a.sender.id, 'typ': timername })
        await a.daily.addLimit(timername, a.sender.id)
    }
}
const helpobj = {
    'command': `nudesall`,
    'categorie': 'Fun',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `nudesall`,
    'permission': 'foruser',
    'description': 'Frage jeden in der Gruppe nach Nacktbildern.'
};

module.exports = {
    nudesall,
    helpobj
}