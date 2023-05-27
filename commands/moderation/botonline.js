async function botonline(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    const isBotOnline = a.isGroupMsg ? await a.db.groupinfoId('botonline', a.groupId) : false

    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)

    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (!a.isGroupAdmins && !isLeitung) return await b.reply(a.from, eng.adminOnly(), a.id)
    var engname = 'BotOnline'
    if (a.ar[0] === 'enable') {
        if (isBotOnline) return await b.reply(a.from, eng.alreadyon(engname), a.id)
        await a.db.setGroupinfoId('botonline', a.groupId);
        await b.reply(a.from, eng.on(engname), a.id)
    } else if (a.ar[0] === 'disable') {
        if (!isBotOnline) return await b.reply(a.from, eng.alreadyoff(engname), a.id)
        await a.db.unsetGroupinfoId('botonline', a.groupId);
        await b.reply(a.from, eng.off(engname), a.id)
    } else {
        await b.reply(a.from, `Verwende ${a.prefix}help botonline um die Vollständige Verwendung zu sehen.`, a.id)
    }
}
const helpobj = {
    'command': `botonline`,
    'categorie': 'Moderation',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `botonline _enable_ / _disable_`,
    'permission': 'foruser',
    'description': 'Schaltet die Funktion botonline an oder aus -> rufe aktuellen Status mit /gi ab\n\n_Diese Funktion sendet wenn angeschaltet eine Nachricht nach Neustart des Bots_'
};

module.exports = {
    botonline,
    helpobj
}