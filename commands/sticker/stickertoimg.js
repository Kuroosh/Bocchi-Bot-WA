async function stickertoimg(a, b, eng) {
    const decryptMedia = require('@open-wa/wa-automate').decryptMedia;
    const uaOverride = a.configjson.uaOverride

    if (a.isQuotedSticker) {
        await b.react(a.message.id, '👍')
        try {
            const mediaData = await decryptMedia(a.quotedMsg, uaOverride)
            const imageBase64 = `data:${a.quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
            await b.sendFile(a.from, imageBase64, 'sticker.jpg', '', a.id)
        } catch (err) {
            console.error(err)
            await b.reply(a.from, 'Error!', a.id)
        }
    } else {
        await b.reply(a.from, eng.wrongFormat(), a.id)
    }


}
const helpobj = {
    'command': `stickertoimg`,
    'categorie': 'Sticker',
    'alias': ['toimg', 'sticker2img'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `stickertoimg _markiere_sticker_`,
    'permission': 'foruser',
    'description': 'Macht aus einem Sticker ein Bild.'
};

module.exports = {
    stickertoimg,
    toimg: stickertoimg,
    sticker2img: stickertoimg,
    helpobj
}
