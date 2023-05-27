async function welcome(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    const isWelcomeOn = a.isGroupMsg ? await a.db.groupinfoId('welcome', a.groupId) : false
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)

    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (!a.isGroupAdmins && !isLeitung) return await b.reply(a.from, eng.adminOnly(), a.id)
    var engname = 'Welcome'
    if (a.ar[0] === 'enable') {
        if (isWelcomeOn) return await b.reply(a.from, eng.alreadyon(engname), a.id)
        await a.db.setGroupinfoId('welcome', a.groupId);
        await b.reply(a.from, eng.on(engname), a.id)
    } else if (a.ar[0] === 'disable') {
        if (!isWelcomeOn) return await b.reply(a.from, eng.alreadyoff(engname), a.id)
        await a.db.unsetGroupinfoId('welcome', a.groupId);
        await b.reply(a.from, eng.off(engname), a.id)
    } else if (a.ar[0] === 'set') {
        var WelcomeNachricht = ''
        for (let i = 1; i < a.args.length; i++)
            WelcomeNachricht += a.args[i] + " "
        if (WelcomeNachricht.length < 3) return await b.reply(a.from, `Du musst etwas Angeben`, a.id)
        await a.db.addGroupinfoMitWert('welcomeMSG', { 'id': a.from, 'wert': WelcomeNachricht })
        await b.sendText(a.from, `WelcomeNachricht erfolgreich gesetzt!\n\n_Neue WelcomeNachricht:_\n${WelcomeNachricht}`)
    } else if (a.ar[0] === 'reset') {
        await a.db.addGroupinfoMitWert('welcomeMSG', { 'id': a.from, 'wert': '0' })
        await b.sendText(a.from, `Aktuelle WelcomeNachricht resetet.`)
    } else if (a.ar[0] === 'check') {
        var result = await a.db.getFromAllWithWhere('groupinfo', { 'groupid': a.from });
        const gcInfo = await b.getGroupInfo(a.from) //Gruppenbeschrebung
        var WelcomeNachricht;
        if (result[0].welcomeMSG == '0') {
            if (gcInfo.description == undefined || gcInfo.description == 'undefined') {
                WelcomeNachricht = 'Kein Text gesetzt und keine Beschreibung vorhanden'
            } else {
                WelcomeNachricht = gcInfo.description
            }
        } else {
            WelcomeNachricht = result[0].welcomeMSG
        }

        await b.sendText(a.from, `Aktuelle WelcomeNachricht:\n${WelcomeNachricht}`)
    } else {
        await b.reply(a.from, `Verwendung:\n${a.prefix}welcome\n_Zeigt Verwendung_\n\n${a.prefix}welcome enable zum aktivieren\n${a.prefix}welcome disable zum deaktivieren\n${a.prefix}welcome set _Deine Nachricht_\n${a.prefix}welcome check - zeigt die gesetzte Nachricht\n${a.prefix}welcome reset - resetet die nachricht`, a.id)
    }
}
const helpobj = {
    'command': `welcome`,
    'categorie': 'Moderation',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `welcome`,
    'permission': 'foruser',
    'description': 'Zeigt dir die Verwendung von der Welcome Funktion'
};
module.exports = {
    welcome,
    helpobj
}