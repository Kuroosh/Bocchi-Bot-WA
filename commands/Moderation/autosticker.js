async function autosticker(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    const isAutoStickerOn = a.isGroupMsg ? await a.db.groupinfoId('autosticker', a.groupId) : false

    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)

    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (!a.isGroupAdmins && !isLeitung) return await b.reply(a.from, eng.adminOnly(), a.id)
    var engname = 'Auto-Sticker'
    if (a.ar[0] === 'enable') {
        if (isAutoStickerOn) return await b.reply(a.from, eng.alreadyon(engname), a.id)
        await a.db.setGroupinfoId('autosticker', a.groupId);
        await b.reply(a.from, eng.on(engname), a.id)
    } else if (a.ar[0] === 'disable') {
        if (!isAutoStickerOn) return await b.reply(a.from, eng.alreadyoff(engname), a.id)
        await a.db.unsetGroupinfoId('autosticker', a.groupId);
        await b.reply(a.from, eng.off(engname), a.id)
    } else {
        await b.reply(a.from, `Verwende ${a.prefix}help autosticker um die Vollständige Verwendung zu sehen.`, a.id)
    }
}
const helpobj = {
    'command': `autosticker`,
    'categorie': 'Moderation',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `autosticker _enable_ / _disable_`,
    'permission': 'foruser',
    'description': 'Schaltet die Funktion Autosticker an oder aus -> rufe aktuellen Status mit /gi ab'
};
module.exports = {
    autosticker,
    helpobj
}