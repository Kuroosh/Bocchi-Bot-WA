async function bewerten(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    const isNsfw = a.isGroupMsg ? await a.db.groupinfoId('nsfw', a.groupId) : false
    const isGaming = a.isGroupMsg ? await a.db.groupinfoId('gaming', a.groupId) : false
    const isPremium = await a.db.containsId('premium', a.sender.id)

    var { getRang } = a.importFresh('../../lib/rang.js')
    var isOwner = await getRang('isOwner', a.sender.id, a.db)

    // if (!isOwner) return await b.reply(a.from, eng.cmdNotFound(), a.id)
    if (a.args.length < 2) {
        await b.sendText(a.from, 'Verwendung: /bewerten <nummer> <sterne>');
        return;
    }

    const nummer = a.args[0].replace(/\D/g, '').replace('@c.us', '') + '@c.us'; // Nur Zahlen zulassen
    const isVerify = await a.db.getId('verify', nummer)
    if (!isVerify) return await b.sendText(a.from, `Diese Person hat die Datenschutzrichtlinien nicht akzeptiert(Verifiziert).`)
    const stars = parseInt(a.args[1], 10);

    if (isNaN(stars) || stars < 1 || stars > 5) {
        await b.sendText(a.from, 'Die Sternebewertung muss eine Zahl von 1 bis 5 sein.');
        return;
    }

    // Füge Bewertung in die Datenbank ein
    if (nummer === a.sender.id) {
        await b.sendText(a.from, 'Du kannst dich nicht selbst bewerten.');
        return;
    } else {
        await a.db.updateReputation(a.sender.id, nummer, stars);
    }

    await b.sendText(a.from, 'Vielen Dank für Ihre Bewertung!');

}

const helpobj = {
    'command': `bewerten`,
    'categorie': 'Bot',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `bewerten @person _sternanzahl 1-5_`,
    'permission': 'foruser',
    'description': 'Du kannst eine Person so bewerten und die durchschnittliche Bewertung steht im Profil.'
};

module.exports = {
    bewerten,
    helpobj
}
            /*
Tabelle: reputation
Tabellenstruktur:
id thanked stars (varchar 255)
Justin Bewertet Nando mit 5 Sterne
491628839166 491628839189 5
*/
