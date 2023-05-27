async function join(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    cd = 900000
    timername = 'timerjoin'
    const timerJoin = await a.db.teamContains2('timer', { 'id': a.sender.id, typ: timername })
    if (timerJoin !== undefined && cd - (Date.now() - timerJoin) > 0) {
        const time = a.ms(cd - (Date.now() - timerJoin))
        await b.reply(a.from, eng.daily(time), a.id)
    } else {
        try {
            var getGroupzjoin = await b.getAllGroups()
            if (a.ar.length > 1) return await b.reply(a.from, `Bitte nenne deinen Gruppenlink wie folgt:\n_${a.prefix}join https://chat.whatsapp.com/xyzxyzxyzxyz_`, a.id)
            if (!a.q.includes('chat.whatsapp.com/')) return await b.reply(a.from, `Bitte nenne deinen Gruppenlink wie folgt:\n_${a.prefix}join https://chat.whatsapp.com/xyzxyzxyzxyz_`, a.id)
            var checklinkjoin = a.args[0]
            const gcInfocheckjoin = await b.inviteInfo(checklinkjoin) //Gruppenbeschreibung
            if (gcInfocheckjoin.size < a.memberLimit) return await b.reply(a.from, `Diese Gruppe ist zu klein!\nVorhandene Member: ${gcInfocheckjoin.size}\nVorrausgesetzte Member: ${memberLimit}\n\nWenn sich nach deiner Anfrage erneut unter 15 Teilnehmer sich befinden, wird diese Anfrage abgelehnt!\n\n_PS: Der Bot Funktioniert auch im Privatchat, 1 Personen Gruppen sind also nicht nötig!_\n\n_Sollte dies eine Vorgrupe sein und ihr wollt euch für HGVG registrieren probiert ${prefix}joinreq vg-link hg-link_`, a.id)
            if (gcInfocheckjoin.groupMetadata.membershipApprovalMode) return await b.reply(a.from, `Eure Gruppe hat die Funktion "Beitrittsanfrage" Aktiv,\n so kann der Bot nicht automatisch Beitreten.\n\nBitte deaktiviere die Funktion und stelle die Anfrage erneut.`, a.id)
            var isBlacklist = await a.db.containsNeu('blacklist', { 'groupid': gcInfocheckjoin.id })
            var isBlacklistText = isBlacklist ? `*JA*` : '*NEIN*'
            //fuck nicht ab 
            //console.log(gcInfocheckjoin)
            await b.sendText(a.DevGroupID, `*── 「 JOIN ANFRAGE 」 ──*\nIn ${a.name || a.formattedTitle}\n\nVon: wa.me/${a.sender.id.replace('@c.us', '')}\n\nGruppenlink\n${a.q}\n\nGruppenname: ${gcInfocheckjoin.subject}\nGruppenbeschreibung:\n${gcInfocheckjoin.groupMetadata.desc}\nBlacklisted: ${isBlacklistText}\nTeilnehmer in der Gruppe: ${gcInfocheckjoin.groupMetadata.size}\n\nIch bin aktuell in ${getGroupzjoin.length - 3} + 3 / ${a.groupLimit}`)
            await b.reply(a.from, `
Der Gruppenlink wurde an uns weitergeleitet.
Bitte habt ein wenig Geduld!

Aktuell haben wir eine hohe Bannwelle, welche uns zu der Entscheidung getroffen hat nurnoch Gruppen mit mindestens 20 Leuten anzunehmen.

Dies ist nichts was wir tun, damit ihr keinen Bot bekommt, sondern um unsere Bots und und euren Spaß an ihnen zu sichern.

Ebenso möchten wir euch darauf hinweisen dass zusätzlich mit den Bots jemand aus unserem Team joint und ein Auge darauf hat, wie aktiv eure Gruppe ist. 
Inaktive Gruppen wird der Bot dann mit der Zeit verlassen.`, a.id)
            await a.db.removetimer('timer', { 'id': a.sender.id, 'typ': timername })
            await a.daily.addLimit(timername, a.sender.id)
        } catch (e) {

            //Wenn Bot mal drinnen war und keine Info auslesen kann, trotzdem join senden
            await b.sendText(a.DevGroupID, `*── 「 JOIN ANFRAGE 」 ──*\n❌Manuelle Prüfung erforderlich❌\n_Dieser Bot war bereits einmal in dieser Gruppe und wurde gekickt_\n\nIn ${a.name || a.formattedTitle}\n\nVon: wa.me/${a.sender.id.replace('@c.us', '')}\n\nGruppenlink\n${a.q}\n\nBlacklisted: ${isBlacklistText}\n\nIch bin aktuell in ${getGroupzjoin.length - 3} + 3 / ${a.groupLimit}`)
            await b.reply(a.from, `Der Gruppenlink wurde an uns weitergeleitet.\nBitte habt ein wenig Geduld!\n\n_Da dieser Bot bereits einmal in deiner Gruppe war, jedoch gekickt wurde, kann die Anfrage minimal mehr beanspruchen_`, a.id)
            await a.db.removetimer('timer', { 'id': a.sender.id, 'typ': timername })
            await a.daily.addLimit(timername, a.sender.id)
        }

    }

}
const helpobj = {
    'command': `join`,
    'categorie': 'Bot',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `join _dein-GruppenLink_`,
    'permission': 'foruser',
    'description': 'Sendet den Link an das Team.'
};

module.exports = {
    join,
    helpobj
}