async function verwarnung(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)

    const isAntibeleidigung = a.isGroupMsg ? await a.db.groupinfoId('antibeleidigung', a.groupId) : false
    var engname = 'Antibeleidigung'
    if (!isAntibeleidigung) return await b.reply(a.from, eng.not(engname), a.id)
    if (a.ar[0] == 'remove' || a.ar[0] == 'r') {
        if (!a.isGroupAdmins && !isLeitung) return await b.reply(a.from, eng.adminOnly(), a.id)
        let verwRemoveNr = null
        if (a.quotedMsg) {
            verwRemoveNr = a.quotedMsgObj.sender.id
        } else {
            verwRemoveNr = a.q.trim().replace(/[ +()-]/g, '').replace(/\D/g, '') + '@c.us'
        }
        if (verwRemoveNr != null && verwRemoveNr != '@c.us') {
            await a.db.setVerwNull({ 'groupid': a.from, 'id': verwRemoveNr })
            await b.reply(a.from, `Verwarnungen dieser Person erfolgreich zurückgesetzt!`, a.id)
        } else {
            await b.reply(a.from, `❌Keine Person übergeben!❌`, a.id)
        }
    } else if (a.ar[0] == 'add') {
        if (!a.isGroupAdmins && !isLeitung) return await b.reply(a.from, eng.adminOnly(), a.id)

        var warnnr = ''
        for (let i = 1; i < a.args.length; i++) {
            warnnr += a.args[i] + ""
        }
        await a.db.updateVerwarnungssystem({ 'groupid': a.from, 'id': warnnr.replace(/\D/g, '') + '@c.us', 'verwarnungsanzahlautomatisch': 1 })
        var verwEintag = await a.db.getWhereWhere('verwarnungssystem', 'groupid', 'id', { 'spalte1': a.from, 'spalte2': warnnr.replace(/\D/g, '') + '@c.us' });
        if (1 === verwEintag.verwarnungsanzahlautomatisch) {
            await b.sendTextWithMentions(a.from, `@${warnnr.replace(/\D/g, '')} Dies ist deine erste Verwarnung.\nKann ja mal passieren.\nHalte dich bitte an die Gruppenregeln.`)
        } else if (2 === verwEintag.verwarnungsanzahlautomatisch) {
            await b.sendTextWithMentions(a.from, `@${warnnr.replace(/\D/g, '')} Dies ist deine zweite Verwarnung.\nSolltest du noch einmal gegen die Gruppenregeln verstoßen wirst du aus der Gruppe entfernt!`)
        } else if (3 <= verwEintag.verwarnungsanzahlautomatisch) {
            await b.sendTextWithMentions(a.from, `@${warnnr.replace(/\D/g, '')} Dies wäre deine dritte Verwarnung.\nAllerdings gibt es nun einen Kick aus der Gruppe!`)
            try {
                await b.removeParticipant(a.from, warnnr.replace(/\D/g, '') + '@c.us')
                await a.db.setVerwNull({ 'groupid': a.from, 'id': warnnr.replace(/\D/g, '') + '@c.us' })
            } catch (e) {
                console.log(e);
            }
            await a.db.setVerwNull({ 'groupid': a.from, 'id': warnnr.replace(/\D/g, '') + '@c.us' })
        }
    } else {
        var verws = await a.db.getVerwList('verwarnungssystem', { 'groupid': a.from }, 'verwarnungsanzahlautomatisch');
        let verwsa = '── *「 ❌ VERWARNUNGEN ❌ 」* ──\n\n'
        try {
            for (let i = 0; i < verws.length; i++) {
                var veirwsname
                var veirwsnameDB = await a.db.getId('registered', verws[i].id)
                if (typeof veirwsnameDB !== typeof undefined && typeof veirwsnameDB !== typeof 0) {
                    veirwsname = veirwsnameDB.name
                } else {
                    var user = await b.getContact(verws[i].id)
                    if (user.isBusiness) {
                        veirwsname = user.verifiedName
                    } else {
                        veirwsname = user.pushname
                    }
                }
                if (isLeitung) {
                    verwsa += `${i + 1}. Name: ${veirwsname}\nwa.me/${verws[i].id.replace('@c.us', '')}\n➸ *Verwarnungen*: ${verws[i].verwarnungsanzahlautomatisch} \n\n`
                } else if (a.isGroupAdmins) {
                    verwsa += `${i + 1}. Name: ${veirwsname}\nwa.me/${verws[i].id.replace('@c.us', '')}\n➸ *Verwarnungen*: ${verws[i].verwarnungsanzahlautomatisch} \n\n`
                } else {
                    verwsa += `${i + 1}. Name: ${veirwsname}\n➸ *Verwarnungen*: ${verws[i].verwarnungsanzahlautomatisch} \n\n`
                }
            }
        } catch (err) {
            console.error(err)
        }
        await b.reply(a.from, `${verwsa}`, a.id)
    }
}
const helpobj = {
    'command': `verwarnung`,
    'categorie': 'Moderation',
    'alias': ['warn'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `verwarnung (add/remove)`,
    'permission': 'foruser',
    'description': 'Mit /warn add @person fügst du der Person eine verwarnung Hinzu.\nMit /warn remove @person oder Personennachrichtmarkieren entfernst du die Verwarnungen der Person..'
};

module.exports = {
    verwarnung,
    warn: verwarnung,
    helpobj
} 