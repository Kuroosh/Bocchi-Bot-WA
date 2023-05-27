async function bitch(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isModerator = await getRang('isModerator', a.sender.id, a.db)
    if (!isModerator) return await b.reply(a.from, eng.modOnly(), a.id)

    var bitchnrid = a.ar[1] + '@c.us'
    var bitchid = await a.db.getFromAll('testdb')
    if (a.ar[0] == 'add') {
        try {
            await a.db.addNoCatch('testdb', { id: bitchnrid, 'bot': '0' })
            await b.reply(a.from, `Erfolgreich ${bitchnrid} in die BLACKLIST-PERSONEN-Liste hinzugefügt als Person!`, a.id)
        } catch (err) {
            await b.reply(a.from, `Nummer ist bereits in der Blacklist eingetragen.`, a.id)
        }
    } else if (a.ar[0] == 'remove') {
        const isBitch = await a.db.containsNeu('testdb', { 'id': bitchnrid });
        if (isBitch) {
            await a.db.removeNeu('testdb', { 'id': bitchnrid })
            await b.sendTextWithMentions(a.from, `Erfolgreich @${bitchnrid.replace('@c.us', '')} aus der Liste gelöscht.`)
        } else {
            await b.reply(a.from, `Nummer ist nicht in der Blacklist eingetragen.`, a.id)
        }
    } else if (a.ar[0] == 'person') {
        var bitchid = await a.db.getFromAllWithWhere('testdb', { 'bot': '0' });
        var bitchidsanzahl = await a.db.countWhere('testdb', { 'bot': '0' })
        let txt = `*── 「 PERSON-BLACKLIST 」 ──*\n\n`
        txt += `Ich habe seit dem 02.07.2022 12:15 \n${bitchidsanzahl} BLACKLIST-PERSONEN gesammelt\n\n`
        for (let i = 0; i < bitchid.length; i++) {
            txt += '╠➥'
            txt += ` ${bitchid[i].id.replace(/@c.us/g, '')} \n`
        }
        txt += '╚══✪〘 *B O C C H I* 〙✪══╝'
        await b.reply(a.from, `${txt}`, a.id)

    } else if (a.ar[0] == 'bot') {
        var bitchid = await a.db.getFromAllWithWhere('testdb', { 'bot': '1' });
        var bitchidsanzahl = await a.db.countWhere('testdb', { 'bot': '1' })
        let txt = `*── 「 Bitches 」 ──*\n\n`
        txt += `Ich habe seit dem 02.07.2022 12:15 \n${bitchidsanzahl} Bitches gesammelt\n`
        for (let i = 0; i < bitchid.length; i++) {
            txt += '╠➥'
            txt += ` ${bitchid[i].id.replace(/@c.us/g, '')} \n`
        }
        txt += '╚══✪〘 *B O C C H I* 〙✪══╝'
        await b.reply(a.from, `${txt}`, a.id)
    } else if (a.args[0] == 'check') {
        const isBitch = await a.db.containsNeu('testdb', { 'id': bitchnrid });
        if (isBitch) {
            await b.sendTextWithMentions(a.from, `Die Person @${bitchnrid.replace('@c.us', '')} ist in der Bitchliste eingetragen!`)
        } else {
            await b.sendTextWithMentions(a.from, `Die Person @${bitchnrid.replace('@c.us', '')} ist nicht in der Bitchliste eingetragen!`)
        }
    } else {
        await b.reply(a.from, `Verwendung:\n\n/Bitch add\nFügt eine Nummer in die Blacklist-Person. Diese wird bei Beitritt automatisch gekickt\n\n/Bitch remove\nEntfernt eine Nummer aus der Blacklist-Person\n\n/Bitch person \nZeigt dir die aktuellen Nummern in der Person-Blacklist an\n\n/Bitch Bot\nZeigt dir alle gesammelten Pornobotnummern an`, a.id)
    }
}
const helpobj = {
    'command': `bitch`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `bitch`,
    'permission': 'bitch',
    'description': 'Verwende /bitch um die komplette Verwendung zu sehen.'
};

module.exports = {
    bitch,
    helpobj
}