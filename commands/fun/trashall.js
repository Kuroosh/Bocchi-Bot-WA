async function trashall(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    const isEveryoneOn = a.isGroupMsg ? await a.db.groupinfoId('everyone', a.groupId) : false

    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)

    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (!isLeitung && !a.isGroupAdmins) return await b.reply(a.from, eng.adminOnly(), a.id)
    if (isEveryoneOn) return await b.reply(a.from, eng.EveryoneOnAlready(), a.id)
    const groupMemtrash = await b.getGroupMembers(a.groupId)
    cd = 7200000
    timername = 'K_F_S_H'
    const timertrashall = await a.db.teamContains2('timer', { 'id': a.sender.id, typ: timername })
    if (timertrashall !== undefined && cd - (Date.now() - timertrashall) > 0) {
        const time = a.ms(cd - (Date.now() - timertrashall))
        await b.reply(a.from, eng.daily(time), a.id)
    } else {
        let txttrash = `╔══✪〘 *🚮MÜLL🚮* 〙✪══\n`
        for (let i = 0; i < groupMemtrash.length; i++) {
            txttrash += '╠➥'
            txttrash += `@${a.sender.id.replace(/@c.us/g, '')} steckt @${groupMemtrash[i].id.replace(/@c.us/g, '')}in den Müll🚮\n`
        }
        txttrash += '╚══✪〘 *B O C C H I* 〙✪══╝'
        await b.sendTextWithMentions(a.from, txttrash)
        await a.db.removetimer('timer', { 'id': a.sender.id, 'typ': timername })
        await a.daily.addLimit(timername, a.sender.id)
    }
}

const helpobj = {
    'command': `trashall`,
    'categorie': 'Fun',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `trashall`,
    'permission': 'foruser',
    'description': 'Stecke alle Leute in der Gruppe in den Mülleimer.'
};

module.exports = {
    trashall,
    helpobj
}
