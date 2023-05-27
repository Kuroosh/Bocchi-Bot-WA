async function leavemsg(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    const isLeaveOn = a.isGroupMsg ? await a.db.groupinfoId('leavemessage', a.groupId) : false
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)

    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (!a.isGroupAdmins && !isLeitung) return await b.reply(a.from, eng.adminOnly(), a.id)
    var engname = 'Leavemessage'
    if (a.ar[0] === 'enable') {
        if (isLeaveOn) return await b.reply(a.from, eng.alreadyon(engname), a.id)
        await a.db.setGroupinfoId('leavemessage', a.groupId);
        await b.reply(a.from, eng.on(engname), a.id)
    } else if (a.ar[0] === 'disable') {
        if (isLeaveOn) return await b.reply(a.from, eng.alreadyoff(engname), a.id)
        await a.db.unsetGroupinfoId('leavemessage', a.groupId);
        await b.reply(a.from, eng.off(engname), a.id)
    } else if (a.ar[0] === 'set') {
        var LeaveNachricht = ''
        for (let i = 1; i < a.args.length; i++)
            LeaveNachricht += a.args[i] + " "
        if (LeaveNachricht.length < 3) return await b.reply(a.from, `Du musst etwas Angeben`, a.id)
        await a.db.addGroupinfoMitWert('leaveMSG', { 'id': a.from, 'wert': LeaveNachricht })
        await b.sendText(a.from, `Leavenachricht erfolgreich gesetzt!\n\n_Neue LeaveNachricht:_\n${LeaveNachricht}`)
    } else if (a.ar[0] === 'reset') {
        await a.db.addGroupinfoMitWert('leaveMSG', { 'id': a.from, 'wert': '0' })
        await b.sendText(a.from, `Aktuelle LeaveNachricht resetet.`)
    } else if (a.ar[0] === 'check') {
        var result = await a.db.getFromAllWithWhere('groupinfo', { 'groupid': a.from });
        var leavenachricht;
        if (result[0].leaveMSG == '0') {
            leavenachricht = 'Schönes Leben'
        } else {
            leavenachricht = result[0].leaveMSG
        }

        await b.sendText(a.from, `Aktuelle LeaveNachricht:\n${leavenachricht}`)
    } else {
        await b.reply(a.from, `Verwendung:\n${a.prefix}leavemsg\n_Zeigt Verwendung_\n\n${a.prefix}leavemsg enable zum aktivieren\n${a.prefix}leavemsg disable zum deaktivieren\n${a.prefix}leavemsg set _Deine Nachricht_\n${a.prefix}leavemsg check - zeigt die gesetzte Nachricht\n${a.prefix}leavemsg reset - resetet die nachricht`, a.id)
    }
}
const helpobj = {
    'command': `leavemsg`,
    'categorie': 'Moderation',
    'alias': ['leavemessage', 'lmsg'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `leavemsg`,
    'permission': 'foruser',
    'description': 'Sendet eine vollständige Erklärung zur Verwendung der Funktion.'
};
module.exports = {
    leavemsg,
    leavemessage: leavemsg,
    lmsg: leavemsg,
    helpobj
}
