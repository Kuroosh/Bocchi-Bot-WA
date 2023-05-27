async function bass(a, b, eng) {
    const path = require('path')
    const decryptMedia = require('@open-wa/wa-automate').decryptMedia;
    const uaOverride = a.configjson.uaOverride
    const isRegistered = await a.db.containsId('registered', a.sender.id)

    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (a.isMedia && a.isAudio || a.isQuotedAudio || a.isVoice || a.isQuotedVoice) {
        if (a.args.length !== 1) return await b.reply(a.from, eng.wrongFormat(), a.id)
        if (a.args[0] > 100) return await b.reply(a.from, `Höchst möglicher Bass 100!`, a.id)
        await b.react(a.message.id, '👍')
        const encryptMedia = a.isQuotedAudio || a.isQuotedVoice ? a.quotedMsg : a.message
        const mediaData = await decryptMedia(encryptMedia, uaOverride)
        const temp = './temp'
        const name = new Date() * 1
        const fileInputPath = path.join(temp, `${name}.mp3`)
        const fileOutputPath = path.join(temp, 'audio', `${name}.mp3`)
        a.fs.writeFile(fileInputPath, mediaData, (err) => {
            if (err) return console.error(err)
            a.ffmpeg(fileInputPath)
                .audioFilter(`equalizer=f=40:width_type=h:width=50:g=${a.args[0]}`)
                .format('mp3')
                .on('start', (commandLine) => console.log(('[FFmpeg]'), commandLine))
                .on('progress', (progress) => console.log(('[FFmpeg]'), progress))
                .on('end', async () => {
                    await b.sendPtt(a.from, fileOutputPath, a.id)
                    setTimeout(() => {
                        a.fs.unlinkSync(fileInputPath)
                        a.fs.unlinkSync(fileOutputPath)
                    }, 30000)
                })
                .save(fileOutputPath)
        })
    } else {
        await b.reply(a.from, eng.wrongFormat(), a.id)
    }


}
const helpobj = {
    'command': `bass`,
    'categorie': 'Fun',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `bass _zahl_ (audio-markieren) `,
    'permission': 'foruser',
    'description': 'Hinterlegt der Audio einen erhöhten bass.'
};

module.exports = {
    bass,
    helpobj
}
