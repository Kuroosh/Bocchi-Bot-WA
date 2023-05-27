async function leveling(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    const isLevelingOn = a.isGroupMsg ? await a.db.groupinfoId('leveling', a.groupId) : false

    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)

    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (!a.isGroupAdmins && !isLeitung) return await b.reply(a.from, eng.adminOnly(), a.id)
    var engname = 'Leveling'
    if (a.ar[0] === 'enable') {
        if (isLevelingOn) return await b.reply(a.from, eng.alreadyon(engname), a.id)
        await a.db.setGroupinfoId('leveling', a.groupId);
        await b.reply(a.from, eng.on(engname), a.id)
    } else if (a.ar[0] === 'disable') {
        if (!isLevelingOn) return await b.reply(a.from, eng.alreadyoff(engname), a.id)
        await a.db.unsetGroupinfoId('leveling', a.groupId);
        await b.reply(a.from, eng.off(engname), a.id)
    } else {
        await b.reply(a.from, `Verwendung:\n${a.prefix}leveling\n_Zeigt Verwendung_\n\n${a.prefix}leveling enable zum aktivieren\n${a.prefix}leveling disable zum deaktivieren\n`, a.id)
    }
}
const helpobj = {
    'command': `leveling`,
    'categorie': 'Moderation',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `leveling _enable_ / _disable_`,
    'permission': 'foruser',
    'description': 'Schaltet die Funktion Level an oder aus -> rufe aktuellen Status mit /gi ab'
};

module.exports = {
    leveling,
    helpobj
}