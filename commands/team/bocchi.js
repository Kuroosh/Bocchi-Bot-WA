async function bocchi(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isModerator = await getRang('isModerator', a.sender.id, a.db)

    if (a.isMe) {
        if (a.quotedMsg) {
            const getQuoted = a.quotedMsgObj.sender.id
            const sessionidfordb = b.getSessionId(getQuoted);
            var typ = ''
            if (a.args.length == 2) {
                typ = a.args[1]
            } else {
                typ = 'BocchiBot'
            }
            if (a.ar[0] == 'add') {
                if (!isModerator) return await b.reply(a.from, eng.modOnly(), a.id)
                await a.db.updateBocchiBot({ botnummer: getQuoted, id: sessionidfordb, 'typ': typ })
                await b.setMyStatus('Bocchi - Verwende /menu um den Bot zu starten')

                await b.reply(a.from, `*── 「 *B O C C H I* 」 ──*\nBot erfolgreich eingetragen mit:\nSessionId: ${sessionidfordb}\nBotnummer: ${getQuoted}\nTyp: ${typ}`, a.id)
                await b.joinGroupViaLink(a.AdsGrp)
                await a.sleep(1000) //Safety
                await b.joinGroupViaLink(a.ErrGrp)
                await a.sleep(1000) //Safety
                await b.joinGroupViaLink(a.DevGrp)
                await a.sleep(1000) //Safety
                await b.joinGroupViaLink(a.RegGrp)
                await a.sleep(1000) //Safety
                await b.sendText(a.AdsGroupID, `Hallo ich bin der Neue Bot *[${a.sessionId}]*, danke ${a.sender.username}`)
                await b.sendText(a.ErrGroupID, `Hallo ich bin der Neue Bot *[${a.sessionId}]*, danke ${a.sender.username}`)
                await b.sendText(a.DevGroupID, `Hallo ich bin der Neue Bot *[${a.sessionId}]*, danke ${a.sender.username}`)
                await b.sendText(a.RegGroupID, `Hallo ich bin der Neue Bot *[${a.sessionId}]*, danke ${a.sender.username}`)

            } else {
                var bbot1 = await a.db.getFromAll('isBocchiBot')
                var bbot2 = `── *「  BOCCHI  」* ──\n\n`;
                bbot1.forEach(e => bbot2 += `SessionId: ${e.id}\nBotnummer: wa.me/${e.botnummer.replace('@c.us', '')}\nTyp: ${e.typ}\n\n`)
                await b.reply(a.from, `${bbot2}`, a.id)
            }
        }
    }

}
const helpobj = {
    'command': `bocchi`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `bocchi add _bot-nachricht-markieren_`,
    'permission': 'bocchi',
    'description': 'Fügt den Bot, als Bocchi in die Datenbank hinzu.'
};
module.exports = {
    bocchi,
    helpobj
}