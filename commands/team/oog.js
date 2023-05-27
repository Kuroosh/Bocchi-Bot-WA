async function oog(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isOwner = await getRang('isOwner', a.sender.id, a.db)
    if (!isOwner) return await b.reply(a.from, eng.ownerOnly(), a.id)
    const groupList = await b.getAllGroups()
    const dataJson1 = await a.db.getFromAllWithWhere('team', { 'typ': 'Inhaber' })
    const dataJson2 = await a.db.getFromAllWithWhere('team', { 'typ': 'StvInhaber' })
    const dataJson3 = await a.db.getFromAllWithWhere('team', { 'typ': 'TopSpender' })
    const dataJson4 = await a.db.getFromAllWithWhere('team', { 'typ': 'Developer' })
    let txt;
    txt = '        -----[ OWNERGRUPPEN ]----- \n\n'
    for (let i = 0; i < dataJson1.length; i++) {
        try {
            const gcInfo3 = await b.inviteInfo(dataJson1[i].oglink) //Gruppenbeschreibung
            try {
                txt += '*_' + dataJson1[i].ogname + '_*' + '\n(' + gcInfo3.groupMetadata.size + ' Teilnehmer' + ')' + '\n' + dataJson1[i].oglink + '\n\n' // txt += '*' +  dataJson1[i].name + '*' + '\n' + '_' + dataJson1[i].ogname + '_' + '\n' + dataJson1[i].oglink + '\n\n'
            } catch (err) {
                txt += '*_' + dataJson1[i].ogname + '_*' + '\n' + dataJson1[i].oglink + '\n\n'
            }
        } catch (err) {
            // txt += '_Og Nicht eingetragen von:_\n' + dataJson1[i].name + ' - ' + dataJson1[i].typ + '\n\n'
        }
    }
    for (let i = 0; i < dataJson2.length; i++) {
        try {
            const gcInfo3 = await b.inviteInfo(dataJson2[i].oglink) //Gruppenbeschreibung
            try {
                txt += '*_' + dataJson2[i].ogname + '_*' + '\n(' + gcInfo3.groupMetadata.size + ' Teilnehmer' + ')' + '\n' + dataJson2[i].oglink + '\n\n' // txt += '*' +  dataJson1[i].name + '*' + '\n' + '_' + dataJson1[i].ogname + '_' + '\n' + dataJson1[i].oglink + '\n\n'
            } catch (err) {
                txt += '*_' + dataJson2[i].ogname + '_*' + '\n' + dataJson2[i].oglink + '\n\n'
            }
        } catch (err) {
            // txt += '_Og Nicht eingetragen von:_\n' + dataJson2[i].name + ' - ' + dataJson2[i].typ + '\n\n'
        }
    }
    for (let i = 0; i < dataJson3.length; i++) {
        try {
            const gcInfo3 = await b.inviteInfo(dataJson3[i].oglink) //Gruppenbeschreibung
            try {
                txt += '*_' + dataJson3[i].ogname + '_*' + '\n(' + gcInfo3.groupMetadata.size + ' Teilnehmer' + ')' + '\n' + dataJson3[i].oglink + '\n\n' // txt += '*' +  dataJson1[i].name + '*' + '\n' + '_' + dataJson1[i].ogname + '_' + '\n' + dataJson1[i].oglink + '\n\n'
            } catch (err) {
                txt += '*_' + dataJson3[i].ogname + '_*' + '\n' + dataJson3[i].oglink + '\n\n'
            }
        } catch (err) {
            // txt += '_Og Nicht eingetragen von:_\n' + dataJson3[i].name + ' - ' + dataJson3[i].typ + '\n\n'
        }
    }
    for (let i = 0; i < dataJson4.length; i++) {
        try {
            const gcInfo3 = await b.inviteInfo(dataJson4[i].oglink) //Gruppenbeschreibung
            try {
                txt += '*_' + dataJson4[i].ogname + '_*' + '\n(' + gcInfo3.groupMetadata.size + ' Teilnehmer' + ')' + '\n' + dataJson4[i].oglink + '\n\n' // txt += '*' +  dataJson1[i].name + '*' + '\n' + '_' + dataJson1[i].ogname + '_' + '\n' + dataJson1[i].oglink + '\n\n'
            } catch (err) {
                txt += '*_' + dataJson4[i].ogname + '_*' + '\n' + dataJson4[i].oglink + '\n\n'
            }
        } catch (err) {
            // txt += '_Og Nicht eingetragen von:_\n' + dataJson4[i].name + ' - ' + dataJson4[i].typ + '\n\n'
        }
    }
    for (let chat_obj of groupList) {
        var grpid = chat_obj.id
        if (!chat_obj.isReadOnly) {
            if (chat_obj.id == '120363038675874425@g.us' || chat_obj.id == '120363039259018408@g.us' || chat_obj.id == '491746583474-1629738018@g.us' || chat_obj.id == '120363022360920817@g.us') {
            } else {
                await b.sendText(grpid, txt)
            }
        }
        await a.sleep(1000)
    }
    await b.sendText(a.from, 'Oog Abgeschlossen!', a.id)
}
const helpobj = {
    'command': `oog`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `oog`,
    'permission': 'oog',
    'description': 'Sendet eine Nachricht mit den Ownergruppen an alle Botgruppen.'
};

module.exports = {
    oog,
    helpobj
}