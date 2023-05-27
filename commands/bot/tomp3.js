async function tomp3(a, b, eng) {
    const { decryptMedia } = require('@open-wa/wa-automate')
    if (a.isMedia && a.isVideo || a.isQuotedVideo) {
        await b.react(a.message.id, '🆗')
        const encryptMedia = a.isQuotedVideo ? a.quotedMsg : a.message
        const _mimetype = a.isQuotedVideo ? a.quotedMsg.mimetype : a.mimetype
        const mediaData = await decryptMedia(encryptMedia, a.uaOverride)
        const temp = './temp'
        const name = new Date() * 1
        const fileInputPath = a.path.join(temp, 'video', `${name}.${_mimetype.replace(/.+\//, '')}`)
        const fileOutputPath = a.path.join(temp, 'audio', `${name}.mp3`)
        a.fs.writeFile(fileInputPath, mediaData, (err) => {
            if (err) return console.error(err)
            a.ffmpeg(fileInputPath)
                .format('mp3')
                .on('end', async () => {
                    await b.sendFile(a.from, fileOutputPath, 'audio.mp3', '', a.id)
                    setTimeout(() => {
                        a.fs.unlinkSync(fileInputPath)
                        a.fs.unlinkSync(fileOutputPath)
                    }, 30000)
                })
                .save(fileOutputPath)
        })
    } else {
        await b.reply(a.from, `Du musst ein Video makieren das als MP3 gesendet werden soll.`, a.id)
    }
}
const helpobj = {
    'command': `tomp3`,
    'categorie': 'Bot',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `tomp3 _video makieren_`,
    'permission': 'foruser',
    'description': 'Wandelt das makierte Video in eine MP3 Datei um.'
};

module.exports = {
    tomp3,
    helpobj
}