async function snowall(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    const isEveryoneOn = a.isGroupMsg ? await a.db.groupinfoId('everyone', a.groupId) : false

    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)

    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (!isLeitung && !a.isGroupAdmins) return await b.reply(a.from, eng.adminOnly(), a.id)
    if (isEveryoneOn) return await b.reply(a.from, eng.EveryoneOnAlready(), a.id)
    const groupMemsnow = await b.getGroupMembers(a.groupId)
    cd = 7200000
    timername = 'K_F_S_H'
    const timerSnowall = await a.db.teamContains2('timer', { 'id': a.sender.id, typ: timername })
    if (timerSnowall !== undefined && cd - (Date.now() - timerSnowall) > 0) {
        const time = a.ms(cd - (Date.now() - timerSnowall))
        await b.reply(a.from, eng.daily(time), a.id)
    } else {
        let txtsnow = `╔══✪〘 *⛄SCHNEEBALL⛄* 〙✪══\n`
        for (let i = 0; i < groupMemsnow.length; i++) {
            txtsnow += '╠➥'
            txtsnow += `@${a.sender.id.replace(/@c.us/g, '')} wirft @${groupMemsnow[i].id.replace(/@c.us/g, '')} mit einem Schneeball ab⛄\n`
        }
        txtsnow += '╚══✪〘 *B O C C H I* 〙✪══╝'
        await b.sendTextWithMentions(a.from, txtsnow)
        await a.db.removetimer('timer', { 'id': a.sender.id, 'typ': timername })
        await a.daily.addLimit(timername, a.sender.id)
    }
}
const helpobj = {
    'command': `snowall`,
    'categorie': 'Fun',
    'alias': ['snowballall'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `snowall`,
    'permission': 'foruser',
    'description': 'Wirf jeden aus der Gruppe mit einem Schneeball ab.'
};

module.exports = {
    snowall,
    snowballall: snowall,
    helpobj
}