async function ownermodus(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)
    if (!isLeitung) return await b.reply(a.from, eng.leitungOnly(), a.id)
    const isOmute = a.isGroupMsg ? await a.db.groupinfoId('omute', a.groupId) : false
    var engname = 'Owner-Modus'
    if (a.ar[0] === 'enable') {
        if (isOmute) return await b.reply(a.from, eng.alreadyon(engname), a.id)
        await a.db.setGroupinfoId('omute', a.groupId);
        await b.reply(a.from, eng.on(engname), a.id)
    } else if (a.ar[0] === 'disable') {
        if (!isOmute) return await b.reply(a.from, eng.alreadyoff(engname), a.id)
        await a.db.unsetGroupinfoId('omute', a.groupId);
        await b.reply(a.from, eng.off(engname), a.id)
    }
}
const helpobj = {
    'command': `ownermodus`,
    'categorie': 'Team',
    'alias': ['omode'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `ownermodus _enable / disable_`,
    'permission': 'ownermodus',
    'description': 'Setzt die Gruppe in den Owner-Modus.'
};

module.exports = {
    ownermodus,
    omode: ownermodus,
    helpobj
}