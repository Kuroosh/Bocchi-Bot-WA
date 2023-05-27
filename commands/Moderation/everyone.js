async function everyone(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    const isEveryoneOn = a.isGroupMsg ? await a.db.groupinfoId('everyone', a.groupId) : false
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)
    var isTeam = await getRang('isTeam', a.sender.id, a.db)

    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (!a.isGroupAdmins && !isLeitung) return await b.reply(a.from, eng.adminOnly(), a.id)
    var engname = 'All'
    if (isEveryoneOn) return await b.reply(a.from, eng.not(engname), a.id)
    const groupMem = await b.getGroupMembers(a.groupId)
    if (isTeam) {
        cd = 3600000
        timername = 'timereveryone'
        const timerEveryone = await a.db.teamContains2('timer', { 'id': a.sender.id, typ: timername })
        if (timerEveryone !== undefined && cd - (Date.now() - timerEveryone) > 0) {
            const time = a.ms(cd - (Date.now() - timerEveryone))
            await b.reply(a.from, eng.daily(time), a.id)
        } else {
            let txt = `╔══✪〘 *EVERYONE* 〙✪══╗\n\n${a.q.replace('+', '')}\n\n`
            for (let i = 0; i < groupMem.length; i++) {
                txt += '╠➥'
                txt += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
            }
            txt += '╚══✪〘 *B O C C H I* 〙✪══╝'
            await b.sendTextWithMentions(a.from, txt)
            await a.db.removetimer('timer', { 'id': a.sender.id, 'typ': timername })
            await a.daily.addLimit(timername, a.sender.id)
        }
    } else {
        cd = 7200000
        timername = 'timereveryone'
        const timerEveryone = await a.db.teamContains2('timer', { 'id': a.sender.id, typ: timername })
        if (timerEveryone !== undefined && cd - (Date.now() - timerEveryone) > 0) {
            const time = a.ms(cd - (Date.now() - timerEveryone))
            await b.reply(a.from, eng.daily(time), a.id)
        } else {
            let txt = `╔══✪〘 *EVERYONE* 〙✪══╗\n\n${a.q.replace('+', '')}\n\n`
            for (let i = 0; i < groupMem.length; i++) {
                txt += '╠➥'
                txt += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
            }
            txt += '╚══✪〘 *B O C C H I* 〙✪══╝'
            await b.sendTextWithMentions(a.from, txt)
            await a.db.removetimer('timer', { 'id': a.sender.id, 'typ': timername })
            await a.daily.addLimit(timername, a.sender.id)
        }
    }
}
const helpobj = {
    'command': `everyone`,
    'categorie': 'Moderation',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `everyone _dein text_`,
    'permission': 'foruser',
    'description': 'Sendet eine Nachricht wo alle Leute in der gruppe Markiert sind und Schreibt darüber deinen Text.'
};
module.exports = {
    everyone,
    helpobj
}