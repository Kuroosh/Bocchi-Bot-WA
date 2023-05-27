async function oldsticker(a, b, eng) {
    const decryptMedia = require('@open-wa/wa-automate').decryptMedia;
    const uaOverride = a.configjson.uaOverride

    if ((a.isMedia || a.isQuotedImage) && a.args.length === 0) {
        try {
            await b.react(a.message.id, '👍')
            const encryptMedia = a.isQuotedImage ? a.quotedMsg : a.message
            const _mimetype = a.isQuotedImage ? a.quotedMsg.mimetype : a.message.mimetype
            const mediaData = await decryptMedia(encryptMedia, uaOverride)
            const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
            await b.sendImageAsSticker(a.from, imageBase64, { keepScale: false, author: 'Stickerbot', pack: 'Bocchibot', discord: "907573119433187329" })
        } catch (err) {
            console.error(err)
            await b.reply(a.from, 'Error!', a.id)
        }
    } else {
        await b.reply(a.from, `Die Datei ist kein Bild!`, a.id)
    }


}
const helpobj = {
    'command': `oldsticker`,
    'categorie': 'Sticker',
    'alias': ['osticker', 'stickerold'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `oldsticker _bild-markieren_`,
    'permission': 'foruser',
    'description': 'Macht nach dem alten Format von Bocchi einen Sticker.'
};

module.exports = {
    oldsticker,
    osticker: oldsticker,
    stickerold: oldsticker,
    helpobj
}
