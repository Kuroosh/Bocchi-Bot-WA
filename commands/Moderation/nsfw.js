
async function nsfw(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    const isNsfw = a.isGroupMsg ? await a.db.groupinfoId('nsfw', a.groupId) : false

    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)

    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (!a.isGroupAdmins && !isLeitung) return await b.reply(a.from, eng.adminOnly(), a.id)
    var engname = 'NSFW'
    if (a.ar[0] === 'enable') {
        if (isNsfw) return await b.reply(a.from, eng.alreadyon(engname), a.id)
        await a.db.setGroupinfoId('nsfw', a.groupId);
        await b.reply(a.from, eng.on(engname), a.id)
    } else if (a.ar[0] === 'disable') {
        if (!isNsfw) return await b.reply(a.from, eng.alreadyoff(engname), a.id)
        await a.db.unsetGroupinfoId('nsfw', a.groupId);
        await b.reply(a.from, eng.off(engname), a.id)
    } else {
        await b.reply(a.from, `Verwendung:\n${a.prefix}nsfw\n_Zeigt Verwendung_\n\n${a.prefix}nsfw enable zum aktivieren\n${a.prefix}nsfw disable zum deaktivieren\n`, a.id)
    }

}
const helpobj = {
    'command': `nsfw`,
    'categorie': 'Moderation',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `nsfw _enable_ / _disable_`,
    'permission': 'foruser',
    'description': 'Schaltet die Funktion NSFW an oder aus -> rufe aktuellen Status mit /gi ab'
};

module.exports = {
    nsfw,
    helpobj
}