async function aidsall(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    const isEveryoneOn = a.isGroupMsg ? await a.db.groupinfoId('everyone', a.groupId) : false

    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)

    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (!isLeitung && !a.isGroupAdmins) return await b.reply(a.from, eng.adminOnly(), a.id)
    if (isEveryoneOn) return await b.reply(a.from, eng.EveryoneOnAlready(), a.id)
    const groupMemtritt = await b.getGroupMembers(a.groupId)
    cd = 7200000
    timername = 'K_F_S_H'
    const timerTrittall = await a.db.teamContains2('timer', { 'id': a.sender.id, typ: timername })
    if (timerTrittall !== undefined && cd - (Date.now() - timerTrittall) > 0) {
        const time = a.ms(cd - (Date.now() - timerTrittall))
        await b.reply(a.from, eng.daily(time), a.id)
    } else {
        let txttritt = `╔══✪〘 *AIDS-INFIZIERUNG* 〙✪══\n`
        for (let i = 0; i < groupMemtritt.length; i++) {
            txttritt += '╠➥'
            txttritt += `@${a.sender.id.replace(/@c.us/g, '')} infiziert @${groupMemtritt[i].id.replace(/@c.us/g, '')} mit Aids🦠\n`
        }
        txttritt += '╚══✪〘 *B O C C H I* 〙✪══╝'
        await b.sendTextWithMentions(a.from, txttritt)
        await a.db.removetimer('timer', { 'id': a.sender.id, 'typ': timername })
        await a.daily.addLimit(timername, a.sender.id)
    }
}
const helpobj = {
    'command': `aidsall`,
    'categorie': 'Fun',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `aidsall`,
    'permission': 'foruser',
    'description': 'Stecke jeden aus der Gruppe mit HIV an.'
};

module.exports = {
    aidsall,
    helpobj
}