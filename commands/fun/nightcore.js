async function nightcore(a, b, eng) {
    const path = require('path')
    const decryptMedia = require('@open-wa/wa-automate').decryptMedia;
    const uaOverride = a.configjson.uaOverride
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)

    if (a.isMedia && a.isAudio || a.isQuotedAudio || a.isVoice || a.isQuotedVoice) {
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
                .audioFilter('asetrate=44100*1.25')
                .format('mp3')
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
    'command': `nightcore`,
    'categorie': 'Fun',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `nightcore`,
    'permission': 'foruser',
    'description': 'Hebt sowohl Stimme als auch Geschwindigkeit einer Audio an.'
};

module.exports = {
    nightcore,
    helpobj
}
