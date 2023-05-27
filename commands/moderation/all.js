async function all(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)
    if (!isLeitung) return await b.reply(a.from, eng.modOnly(), a.id)
    const isEveryoneOn = a.isGroupMsg ? await a.db.groupinfoId('everyone', a.groupId) : false
    var isGroupOwner;
    try {
        if (a.isGroupMsg) {
            isGroupOwner = a.chat.groupMetadata.owner == a.sender.id
        }
    } catch (err) {
        //
    }
    var engname = '/Everyone'
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (!isLeitung && !isGroupOwner) return await b.reply(a.from, `Der Befehl ist nur für Owner und Gruppenersteller!`, id)
    if (a.ar[0] === 'disable') {  //verbot aufheben
        if (isEveryoneOn) return await b.reply(a.from, eng.alreadyoff(engname), a.id)
        await a.db.setGroupinfoId('everyone', a.groupId);
        await b.reply(a.from, eng.off(engname), a.id)
    } else if (a.ar[0] === 'enable') { //verbot erteilen
        if (!isEveryoneOn) return await b.reply(a.from, eng.alreadyon(engname), a.id)
        await a.db.unsetGroupinfoId('everyone', a.groupId);
        await b.reply(a.from, eng.on(engname), a.id)
    } else {
        await b.reply(a.from, eng.wrongFormat(), a.id)
    }


}
const helpobj = {
    'command': `all`,
    'categorie': '',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `all enable / disable`,
    'permission': 'foruser',
    'description': 'Verbietet / Erlaubt die FUnktion Everyoen.'
};

module.exports = {
    all,
    helpobj
}
