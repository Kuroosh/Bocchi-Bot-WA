async function antispam(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    const isAntiSpam = a.isGroupMsg ? await a.db.groupinfoId('antispam', a.groupId) : false

    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)

    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (!a.isGroupAdmins && !isLeitung) return await b.reply(a.from, eng.adminOnly(), a.id)
    if (!a.isBotGroupAdmins) return await b.reply(a.from, eng.botNotAdmin(), a.id)
    var engname = 'Antispam'
    if (a.ar[0] === 'enable') {
        if (isAntiSpam) return await b.reply(a.from, eng.alreadyon(engname), a.id)
        await a.db.setGroupinfoId('antispam', a.groupId);
        await b.reply(a.from, eng.on(engname), a.id)
    } else if (a.ar[0] === 'disable') {
        if (!isAntiSpam) return await b.reply(a.from, eng.alreadyoff(engname), a.id)
        await a.db.unsetGroupinfoId('antispam', a.groupId);
        await b.reply(a.from, eng.off(engname), a.id)
    } else {
        await b.reply(a.from, `Verwende ${a.prefix}help antispam um die Vollständige Verwendung zu sehen.`, a.id)
    }
}
const helpobj = {
    'command': `antispam`,
    'categorie': 'Moderation',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `antispam _enable_ / _disable_`,
    'permission': 'foruser',
    'description': 'Schaltet die Funktion antispam an oder aus -> rufe aktuellen Status mit /gi ab\n_Diese Funktion löscht Spam automatisch aus der Gruppe._'
};

module.exports = {
    antispam,
    helpobj
}