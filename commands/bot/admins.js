async function admins(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isTeam = await getRang('isTeam', a.sender.id, a.db)
    const isRegistered = await a.db.containsId('registered', a.sender.id)

    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    const groupAdm = await b.getGroupAdmins(a.groupId)
    if (isTeam) {
        cd = 3600000
        timername = 'timereveryone'
        const timerEveryone = await a.db.teamContains2('timer', { 'id': a.sender.id, typ: timername })
        if (timerEveryone !== undefined && cd - (Date.now() - timerEveryone) > 0) {
            const time = a.ms(cd - (Date.now() - timerEveryone))
            await b.reply(a.from, eng.daily(time), a.id)
        } else {
            var text = a.q
            let txtAdmin = ''
            for (let i = 0; i < groupAdm.length; i++) {
                txtAdmin += `╠➥ @${groupAdm[i].replace(/@c.us/g, '')}\n`
            }
            await b.sendTextWithMentions(a.from, eng.admin(text, txtAdmin))
            await a.db.removetimer('timer', { 'id': a.sender.id, 'typ': timername })
            await daily.addLimit(timername, a.sender.id)
        }
    } else {
        cd = 7200000
        timername = 'timereveryone'
        const timerEveryone = await a.db.teamContains2('timer', { 'id': a.sender.id, typ: timername })
        if (timerEveryone !== undefined && cd - (Date.now() - timerEveryone) > 0) {
            const time = a.ms(cd - (Date.now() - timerEveryone))
            await b.reply(a.from, eng.daily(time), a.id)
        } else {
            var text = a.q
            let txtAdmin = ''
            for (let i = 0; i < groupAdm.length; i++) {
                txtAdmin += '╠➥'
                txtAdmin += ` @${groupAdm[i].replace(/@c.us/g, '')} \n`
            }
            await b.sendTextWithMentions(a.from, eng.admin(text, txtAdmin))
            await a.db.removetimer('timer', { 'id': a.sender.id, 'typ': timername })
            await a.daily.addLimit(timername, a.sender.id)
        }
    }



}
const helpobj = {
    'command': `admins`,
    'categorie': 'Bot',
    'alias': ['admin'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `admins`,
    'permission': 'foruser',
    'description': 'Markiert alle Admins in der Gruppe.'
};

module.exports = {
    admins,
    admin: admins,
    helpobj
}