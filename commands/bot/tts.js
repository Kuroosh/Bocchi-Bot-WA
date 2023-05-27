async function tts(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isTeam = await getRang('isTeam', a.sender.id, a.db)
    const tts = require('node-gtts')
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (a.message.body.lenght > 256) return await b.reply(a.from, `Maximal 256 Zeichen`, a.id)
    if (!a.q) return await b.reply(a.from, eng.wrongFormat(), a.id)
    if (!a.q.includes('/')) return await b.reply(a.from, `Bitte setze zwischen den Text und den Ländercode ein */*\n_Beispiel:_ ${a.prefix}tts de / Hallo `, a.id)
    if (isTeam) {
        const speech = a.q.substring(a.q.indexOf('/') + 2)
        const ptt = tts(a.ar[0])
        try {
            ptt.save(`./temp/audio/${speech}.mp3`, speech, async () => {
                await b.sendPtt(a.from, `./temp/audio/${speech}.mp3`, a.id)
                a.fs.unlinkSync(`./temp/audio/${speech}.mp3`)
            })
        } catch (err) {
            console.error(err)
            await b.reply(a.from, 'Error!', a.id)
        }
    } else {
        cd = 90000
        timername = 'timertts'
        const timerTts = await a.db.teamContains2('timer', { 'id': a.sender.id, typ: timername })
        if (timerTts !== undefined && cd - (Date.now() - timerTts) > 0) {
            const time = a.ms(cd - (Date.now() - timerTts))
            await b.sendText(a.from, eng.daily(time), a.id)
        } else {
            const speech = a.q.substring(a.q.indexOf('/') + 2)
            const ptt = tts(a.ar[0])
            try {
                ptt.save(`./temp/audio/${speech}.mp3`, speech, async () => {
                    await b.sendPtt(a.from, `./temp/audio/${speech}.mp3`, a.id)
                    a.fs.unlinkSync(`./temp/audio/${speech}.mp3`)
                })
            } catch (err) {
                console.error(err)
                await b.reply(a.from, 'Error!', a.id)
            }
            await a.db.removetimer('timer', { 'id': a.sender.id, 'typ': timername })
            await a.daily.addLimit(timername, a.sender.id)
        }
    }

}
const helpobj = {
    'command': `tts`,
    'categorie': 'Bot',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `tts _Deine Nachricht_`,
    'permission': 'foruser',
    'description': 'Bot sendet ein Audio mit deinem Text.'
};

module.exports = {
    tts,
    helpobj
}
