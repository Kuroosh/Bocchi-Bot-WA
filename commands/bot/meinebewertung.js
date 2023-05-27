async function meinebewertung(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isOwner = await getRang('isOwner', a.sender.id, a.db)

    if (!isOwner) return await b.reply(a.from, eng.cmdNotFound(), a.id)
    try {
        const average = await a.db.getSelfRatingAverage(a.sender.id);
        const count = await a.db.getRatingCountForUser(a.sender.id);
        const roundedAverage = Math.round(average);
        let message = `Du hast ${count} Bewertungen erhalten mit einem Durchschnitt von ${roundedAverage} Sternen:\n`;
        for (let i = 0; i < Math.floor(average); i++) {
            message += '★';
        }
        if (average - Math.floor(average) >= 0.5) {
            message += '½';
        }
        message += `\n\n${count > 0 ? 'Vielen Dank für deine Unterstützung!' : 'Du hast noch keine Bewertungen erhalten.'}`;
        await b.sendText(a.from, message);
    } catch (e) {
        console.log(e);
        await b.sendText(a.from, 'Es ist ein Fehler aufgetreten.');
    }
}
const helpobj = {
    'command': `meinebewertung`,
    'categorie': 'Bot',
    'alias': ['mystars', 'meinebewertungen'],
    'usage': `meinebewertung`,
    'permission': 'foruser',
    'description': 'Sendet deine Durchschnittliche Bewertung.'
};

module.exports = {
    meinebewertung,
    mb: meinebewertung,
    mystars: meinebewertung,
    meinebewertungen: meinebewertung,
    helpobj
}
