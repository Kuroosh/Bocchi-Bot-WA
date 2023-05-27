async function grouprules(a, b, eng) {
    if (a.args[0] == 'set') {
        var Gruppenregeln = ''
        for (let i = 1; i < a.args.length; i++)
            Gruppenregeln += a.args[i] + " "
        if (Gruppenregeln.length < 3) return await b.reply(a.from, `Du musst regeln Angeben`, a.id)
        await a.db.addGroupinfoMitWert('grouprules', { 'id': a.from, 'wert': Gruppenregeln })
        await b.sendText(a.from, `Gruppenregeln erfolgreich gesetzt!\n\n_Neue regeln:_\n${Gruppenregeln}`)
    } else {
        var result = await a.db.getFromAllWithWhere('groupinfo', { 'groupid': a.from });

        await b.sendText(a.from, `${result[0].grouprules}`)

    }
}
const helpobj = {
    'command': `grouprules`,
    'categorie': 'Moderation',
    'alias': ['gr'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `grouprules set _deine regeln_`,
    'permission': 'foruser',
    'description': 'Setzt Gruppenregeln.\n_Diese sind verwendbar zumm Beispiel in Welcome_'
};

module.exports = {
    grouprules,
    gr: grouprules,
    helpobj
}