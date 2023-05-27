async function animezitat(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    const isNsfw = a.isGroupMsg ? await a.db.groupinfoId('nsfw', a.groupId) : false
    const isGaming = a.isGroupMsg ? await a.db.groupinfoId('gaming', a.groupId) : false
    const isPremium = await a.db.containsId('premium', a.sender.id)

    //es ist möglich ein eigenen Anime zu wählen, jedoch ist die verfügbarkeitsliste ekelhaft lang/kurz
    //entsprechend function anpassen, siehe quelle: https://animechan.vercel.app/docs#random-quote
    a.anime.animezitate()
        .then((quote) => {
            console.log(quote);
            b.sendText(a.from, `
Hier ein Zufälliges Zitat aus einem Anime 👍

Anime: ${quote.anime}
Character: ${quote.character}
Zitat: ${quote.quote}
                `)
        })
        .catch((err) => {
            console.log(err);
            b.sendText(a.from, 'Hier ist leider ein Fehler aufgetreten. Versuche es gerne später nocheinmal.')
        });
}

//=================0

const helpobj = {
    'command': `animezitat`,
    'categorie': 'Fun',
    'alias': ['az'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `animezitat`,
    'permission': 'foruser',
    'description': 'Nenne einen Zufälliges Zitat aus einem Anime.'
};


module.exports = {
    animezitat,
    az: animezitat,
    helpobj
}