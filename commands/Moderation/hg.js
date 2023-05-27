async function hg(a, b, eng) {
    async function hgvgCheck(tagName) {
        return (await a.db.containsNeu('hgvg', { 'vg': tagName }));
    }
    async function hgvgItem(tagName) {
        var g = await a.db.getNeu('hgvg', { 'vg': tagName })
        if (typeof g === typeof undefined) {
            return "LEER";
        }
        return g.hg;
    }
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)

    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (!a.isGroupAdmins && !isLeitung) return await b.reply(a.from, eng.adminOnly(), a.id)
    if (!a.isBotGroupAdmins) return await b.reply(a.from, eng.botNotAdmin(), a.id)
    if (a.quotedMsg) {
        const getQuoted = a.quotedMsgObj.sender.id
        a.mentionedJidList[0] = getQuoted
    }
    if (a.mentionedJidList.length === 0) return await b.reply(a.from, eng.wrongFormat(), a.id)
    if (a.mentionedJidList[0] === a.botNumber) return await b.reply(a.from, `Denk nicht mal dran!`, a.id)
    var tempItem;
    hgvgItem(a.from).then(function (res) {
        tempItem = res
        hgvgCheck(a.from).then(async function (res) {
            if (res) {
                for (let i of a.mentionedJidList) {
                    try {
                        try {
                            await b.addParticipant(tempItem, i)
                        } catch (e) {
                        }
                        await b.sendTextWithMentions(a.from, `Ok ${a.mentionedJidList.map(x => `@${x.replace('@c.us', '')}`)} wird nun zur Hauptgruppe hinzugefügt!`)
                        await b.sendTextWithMentions(tempItem, `Bitte stelle dich erneut in der Hauptgruppe vor @${i}`)
                        await b.removeParticipant(a.from, i)
                    } catch (err) {
                        b.react(a.message.id, '❌')
                        // b.sendTextWithMentions(a.from, `Der Benutzer hat das Einladen deaktiviert.\nBitte speichere den Bot ein @${i.replace('@c.us', '')}`, a.id)
                    }
                }
            }
        })
    })

}
const helpobj = {
    'command': `hg`,
    'categorie': 'Moderation',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `hg @person`,
    'permission': 'foruser',
    'description': 'Der Bot fügt die Person die Makriert ist automatisch in die Hauptgruppe sofern diese verlinkt ist.'
};

module.exports = {
    hg,
    helpobj
}

/* 
            case prefix + 'joinreq':
                if (!isOwner) return await bocchi.reply(from, `Zurzeit werden keine neuen HG VG Aufgenommen\nMfg Nando`, id)
                //Aktuell keine neuen HG VG weil /hg gefährlich
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (ar.length < 2 || ar.length > 2) return await bocchi.reply(from, `Bitte nur 2 Gruppenlinks!\nBitte zuerst die Vorgruppe dann die Hauptgruppe eintragen!\nKein weiterer Text!`, id)
                if (!ar[0].includes('chat.whatsapp.com/')) return await bocchi.reply(from, `Dies ist kein Gruppenlink!\nBitte zuerst die Vorgruppe dann die Hauptgruppe eintragen!`, id)
                if (!ar[1].includes('chat.whatsapp.com/')) return await bocchi.reply(from, `Dies ist kein Gruppenlink!\nBitte zuerst die Vorgruppe dann die Hauptgruppe eintragen!`, id)
                joinreqvg = args[0]
                joinreqhg = args[1]
                var gcInfocheckjoinreqvg = await bocchi.inviteInfo(joinreqvg) //Gruppenbeschreibung
                var gcInfocheckjoinreqhg = await bocchi.inviteInfo(joinreqhg) //Gruppenbeschreibung
                if (gcInfocheckjoinreqhg.size < memberLimit) return await bocchi.reply(from, `Diese Hauptgruppe ist zu klein!\nVorhandene Member: ${gcInfocheckjoinreqhg.size}\nVorrausgesetzte Member: ${memberLimit}\n\nWenn sich nach deiner Anfrage erneut unter 10 Teilnehmer sich befinden, wird diese Anfrage abgelehnt!\n\n_PS: Der Bot Funktioniert auch im Privatchat, 1 Personen Gruppen sind also nicht nötig!_\n\n_Sollte dies eine Vorgrupe sein und ihr wollt euch für HGVG registrieren probiert ${prefix}joinreq vg-link hg-link_`, id)
                await bocchi.reply(from, `Die Gruppenlinks werden an uns weitergeleitet.\nBitte habt ein wenig Geduld!`, id)
                await bocchi.sendText(DevGroupID, `*── 「 Joinreq 」 ──*\n\nIn ${name || formattedTitle}\n\nVon: wa.me/${sender.id.replace('@c.us', '')}\n\nGruppenname-Vg:\n${gcInfocheckjoinreqvg.subject}\nTeilnehmer: ${gcInfocheckjoinreqvg.size}\n${joinreqvg}\n\nnGruppenname-Hg:\n${gcInfocheckjoinreqhg.subject}\nTeilnehmer: ${gcInfocheckjoinreqhg.size}\n${joinreqhg}`)
                await bocchi.sendText(DevGroupID, `${prefix}joinvghg ${joinreqvg} ${joinreqhg}`)
                break


                            // Aktuell nicht möglich
            // case prefix + 'joinvghg':
            //     if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
            //     if (!isModerator) return await bocchi.reply(from, eng.modOnly(), id)
            //     linkreqvg = args[0]
            //     linkreqhg = args[1]
            //     var groupinfovg = await bocchi.inviteInfo(linkreqvg)
            //     var groupinfohg = await bocchi.inviteInfo(linkreqhg)
            //     if (isMe) {
            //         await db.addGroupinfoMitWert('welcome', { 'id': groupinfovg.id, 'wert': 0 })
            //         await db.addGroupinfoMitWert('welcome', { 'id': groupinfohg.id, 'wert': 0 })
            //         var vghgreq = { "hg": groupinfohg.id, "vg": groupinfovg.id }
            //         await db.add('hgvg', vghgreq)
            //         await sleep(2500)
            //         await bocchi.joinGroupViaLink(linkreqvg)
            //         await bocchi.joinGroupViaLink(linkreqhg)
            //         await bocchi.sendText(groupinfovg.id, `Hallo liebe Vorgruppe!\n---> guckt in die Hauptgruppe`)
            //         await bocchi.sendText(groupinfohg.id, `Hallo liebe Hauptgruppe!\nDie Gruppen sind miteinander verbunden...\nSolltet ihr fragen haben? wa.me/+491628839189!`)
            //         await bocchi.reply(from, `Erfolgreich beiden Gruppen gejoint!\nUnd beide Gruppen verbunden!`, id)
            //     }
            //     break

*/