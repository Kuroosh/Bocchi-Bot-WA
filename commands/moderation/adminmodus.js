async function adminmodus(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    const isMute = a.isGroupMsg ? await a.db.groupinfoId('mute', a.groupId) : false

    var { getRang } = a.importFresh('../../lib/rang.js')
    var isTeam = await getRang('isTeam', a.sender.id, a.db)

    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (!a.isGroupAdmins && !isTeam) return b.reply(a.from, eng.adminOnly(), a.id)
    var engname = 'Admin-Modus'
    if (a.ar[0] === 'enable') {
        if (isMute) return await b.reply(a.from, eng.alreadyon(engname), a.id)
        await a.db.setGroupinfoId('mute', a.groupId);
        await b.reply(a.from, eng.on(engname), a.id)
    } else if (a.ar[0] === 'disable') {
        if (!isMute) return await b.reply(a.from, eng.alreadyoff(engname), a.id)
        await a.db.unsetGroupinfoId('mute', a.groupId);
        await b.reply(a.from, eng.off(engname), a.id)
    }
}
const helpobj = {
    'command': `adminmodus`,
    'categorie': 'Moderation',
    'alias': ['amode'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `adminmodus _enable_ / _disable_`,
    'permission': 'foruser',
    'description': 'Schaltet die Funktion Adminmodus an oder aus -> rufe aktuellen Status mit /gi ab'
};

module.exports = {
    adminmodus,
    amode: adminmodus,
    helpobj
}