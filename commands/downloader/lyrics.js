async function lyrics(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)

    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.q) return await b.reply(a.from, eng.wrongFormat(), a.id)
    const lyricsFinder = require('lyrics-finder');
    let lyrics = await lyricsFinder(a.message.body.slice(7)) || "Not Found!";
    b.reply(a.from, lyrics, a.id)


}
const helpobj = {
    'command': `lyrics`,
    'categorie': 'Downloader',
    'alias': ['lyric'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `lyrics _Songname_`,
    'permission': 'foruser',
    'description': 'Sendet den Songtext deines Liedes.'
};

module.exports = {
    lyrics,
    lyric: lyrics,
    helpobj
}
