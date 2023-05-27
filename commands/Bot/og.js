async function og(a, b, eng) {
    const dataJson1 = await a.db.getFromAllWithWhere('team', { 'typ': 'Inhaber' })
    const dataJson2 = await a.db.getFromAllWithWhere('team', { 'typ': 'StvInhaber' })
    const dataJson3 = await a.db.getFromAllWithWhere('team', { 'typ': 'TopSpender' })
    const dataJson4 = await a.db.getFromAllWithWhere('team', { 'typ': 'Developer' })
    const dataJson5 = await a.db.getFromAllWithWhere('team', { 'typ': 'Mod' })
    
    txt = '        -----[ OWNERGRUPPEN ]----- \n\n'
    try {
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
        for (let i = 0; i < dataJson5.length; i++) {
            try {
                const gcInfo3 = await b.inviteInfo(dataJson5[i].oglink) //Gruppenbeschreibung
                try {
                    txt += '*_' + dataJson5[i].ogname + '_*' + '\n(' + gcInfo3.groupMetadata.size + ' Teilnehmer' + ')' + '\n' + dataJson5[i].oglink + '\n\n' // txt += '*' +  dataJson1[i].name + '*' + '\n' + '_' + dataJson1[i].ogname + '_' + '\n' + dataJson1[i].oglink + '\n\n'
                } catch (err) {
                    txt += '*_' + dataJson5[i].ogname + '_*' + '\n' + dataJson5[i].oglink + '\n\n'
                }
            } catch (err) {
                // txt += '_Og Nicht eingetragen von:_\n' + dataJson5[i].name + ' - ' + dataJson5[i].typ + '\n\n'
            }
        }
        // await b.sendText(a.from, `1 ${txt2}`)
        await b.sendText(a.from, `${txt}`)
    } catch (err) {
        // await b.sendText(a.from, `2 ${txt2}`)
        await b.sendText(a.from, err + '' + '\n\n\n' + txt)
    }
}
const helpobj = {
    'command': `og`,
    'categorie': 'Bot',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `og`,
    'permission': 'foruser',
    'description': 'Sendet eine Liste Aller OwnerGruppen-Links.'
};

module.exports = {
    og,
    helpobj
}