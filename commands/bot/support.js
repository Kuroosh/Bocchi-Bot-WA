async function support(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    var gruppenLink;
    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.q) return await b.reply(a.from, eng.emptyMess(), a.id)
    if (a.ar[0] === 'reply') {
        return
    } else if (a.isGroupMsg) {
        cd = 900000
        timername = 'timersupport'
        if (a.sender.id == '491628839166@c.us' || a.sender.id == '491628839189@c.us') {
            cd = 0
        }
        const timerSupport = await a.db.teamContains2('timer', { 'id': a.sender.id, typ: timername })
        if (timerSupport !== undefined && cd - (Date.now() - timerSupport) > 0) {
            const time = a.ms(cd - (Date.now() - timerSupport))
            await b.reply(a.from, eng.daily(time), a.id)
        } else {
            try {
                var gruppenName = a.groupMetadata.subject
                var gruppenZahl = a.groupMetadata.size
                const isBotGroupAdmins = a.isGroupMsg ? a.groupAdmins.includes(a.botNumber) : false
                if (isBotGroupAdmins) {
                    gruppenLink = await b.getGroupInviteLink(a.from)
                } else {
                    gruppenLink = '_Der Bot ist kein Admin_'
                }
                var count = await a.db.getAll('info', 'wert')
                var counts = '';
                count.forEach(e => counts += e);
                var wert = await a.db.updateSupportCount()
                await b.sendText(a.AdsGroupID, `*── 「 SUPPORT 」 ──*\n\nID: ${counts}\n*Von*: ${a.sender.username}\n*In*: ${gruppenName} (${gruppenZahl} / 512)\n*Link*: ${gruppenLink}\nwa.me/${a.sender.id.replace('@c.us', '')}\n*Nachricht*: ${a.q}`)
                await b.sendText(a.AdsGroupID, `-support reply \nID: ${counts}\n\nFrage:${a.q}\n\nAntwort:\n`)
                await b.reply(a.from, eng.receiveds(a.sender.username, counts), a.id);
                await a.db.removetimer('timer', { 'id': a.sender.id, 'typ': timername })
                await a.daily.addLimit(timername, a.sender.id)
            } catch (e) {
                console.log(e)
            }
        }
    } else {
        cd = 900000
        timername = 'timersupport'
        const timerSupport = await a.db.teamContains2('timer', { 'id': a.sender.id, typ: timername })
        if (timerSupport !== undefined && cd - (Date.now() - timerSupport) > 0) {
            const time = a.ms(cd - (Date.now() - timerSupport))
            await b.reply(a.from, eng.daily(time), a.id)
        } else {
            var count = await a.db.getAll('info', 'wert')
            var counts = '';
            count.forEach(e => counts += e);
            var wert = await a.db.updateSupportCount()
            await b.sendText(a.AdsGroupID, `*── 「 SUPPORT 」 ──*\n\nID: ${counts}\n*From*: ${a.sender.username}\n*UserID*: ${a.sender.id}\nwa.me/${a.sender.id.replace('@c.us', '')}\n*Nachricht*: ${a.q}`)
            await b.sendText(a.AdsGroupID, `-support reply \nID: ${counts}\n\nFrage:${a.q}\n\nAntwort:\n`)
            await b.reply(a.from, eng.receiveds(a.sender.username, counts), a.id);
            await a.db.removetimer('timer', { 'id': a.sender.id, 'typ': timername })
            await a.daily.addLimit(timername, a.sender.id)
        }
    }
}
const helpobj = {
    'command': `support`,
    'categorie': 'Bot',
    'alias': ['sup'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `support _Deine Frage_`,
    'permission': 'foruser',
    'description': 'Sendet an das Team deine Anfrage.'
};

module.exports = {
    support,
    sup: support,
    helpobj
}