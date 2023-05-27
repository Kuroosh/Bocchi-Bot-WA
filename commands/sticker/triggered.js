async function triggered(a, b, eng) {
    const path = require('path')
    const decryptMedia = require('@open-wa/wa-automate').decryptMedia;
    const uaOverride = a.configjson.uaOverride

    const isRegistered = await a.db.containsId('registered', a.sender.id)

    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (a.isMedia && a.isImage || a.isQuotedImage) {
        await b.react(a.message.id, '👍')
        const encryptMedia = a.isQuotedImage ? a.quotedMsg : a.message
        const mediaData = await decryptMedia(encryptMedia, uaOverride)
        const temp = './temp'
        const name = new Date() * 1
        const fileInputPath = path.join(temp, `${name}.gif`)
        const fileOutputPath = path.join(temp, 'video', `${name}.mp4`)
        a.canvas.Canvas.trigger(mediaData)
            .then((buffer) => {
                a.canvas.write(buffer, fileInputPath)
                a.ffmpeg(fileInputPath)
                    .outputOptions([
                        '-movflags faststart',
                        '-pix_fmt yuv420p',
                        '-vf scale=trunc(iw/2)*2:trunc(ih/2)*2'
                    ])
                    .inputFormat('gif')
                    .on('end', async () => {
                        await b.sendMp4AsSticker(a.from, fileOutputPath, { fps: 30, startTime: '00:00:00.0', endTime: '00:00:05.0', loop: 0, discord: "907573119433187329" })
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
    'command': `triggered`,
    'categorie': 'Sticker',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `triggered _bild-markieren_`,
    'permission': 'foruser',
    'description': 'Sendet einen Sticker mit Triggered Effekt.'
};

module.exports = {
    triggered,
    helpobj
}
