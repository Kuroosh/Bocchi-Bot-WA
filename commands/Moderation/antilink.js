async function antilink(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    const isDetectorOnLINK = a.isGroupMsg ? await a.db.groupinfoId('antilink', a.groupId) : false

    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)

    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (!a.isGroupAdmins && !isLeitung) return await b.reply(a.from, eng.adminOnly(), a.id)
    if (!a.isBotGroupAdmins) return await b.reply(a.from, eng.botNotAdmin(), a.id)
    var engname = 'Antilink'
    if (a.ar[0] === 'enable') {
        if (isDetectorOnLINK) return await b.reply(a.from, eng.alreadyon(engname), a.id)
        await a.db.setGroupinfoId('antilink', a.groupId);
        await b.reply(a.from, eng.on(engname), a.id)
    } else if (a.ar[0] === 'disable') {
        if (!isDetectorOnLINK) return await b.reply(a.from, eng.alreadyoff(engname), a.id)
        await a.db.unsetGroupinfoId('antilink', a.groupId);
        await b.reply(a.from, eng.off(engname), a.id)
    } else {
        await b.reply(a.from, `Verwende ${a.prefix}help antilink um die Vollständige Verwendung zu sehen.`, a.id)
    }
}
const helpobj = {
    'command': `antilink`,
    'categorie': 'Moderation',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `antilink _enable_ / _disable_`,
    'permission': 'foruser',
    'description': 'Schaltet die Funktion antilink an oder aus -> rufe aktuellen Status mit /gi ab\n_Diese Funktion kickt bei Gruppenwerbung automatisch aus der Gruppe._'
};

module.exports = {
    antilink,
    helpobj
}