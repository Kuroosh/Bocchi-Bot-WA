async function sticker(a, b, eng) {
    const decryptMedia = require('@open-wa/wa-automate').decryptMedia;
    const uaOverride = a.configjson.uaOverride
    if (a.username == undefined) {
        a.username = 'Bocchi'
    }
    if (a.isMedia && a.message.type === 'image') {
        await b.react(a.message.id, '👍')
        const mediaData = await decryptMedia(a.message, uaOverride)
        const imageBase64 = `data:${a.message.mimetype};base64,${mediaData.toString('base64')}`
        await b.sendImageAsSticker(a.from, imageBase64, { pack: `Erstellt für`, keepScale: true, author: `${a.username}`, discord: "907573119433187329" })
    } else if (a.quotedMsg && a.quotedMsg.type == 'image') {
        await b.react(a.message.id, '👍')
        const mediaData = await decryptMedia(a.quotedMsg, uaOverride)
        const imageBase64 = `data:${a.quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
        await b.sendImageAsSticker(a.from, imageBase64, { pack: `Erstellt für`, keepScale: true, author: `${a.username}`, discord: "907573119433187329" })
    } else if (a.isMedia && a.message.type === 'video' || a.message.mimetype === 'image/gif') {
        await b.react(a.message.id, '👍')
        try {
            const mediaData = await decryptMedia(a.message, uaOverride)
            await b.sendMp4AsSticker(a.from, mediaData, { fps: 10, startTime: `00:00:00.0`, endTime: `00:00:10.0`, loop: 0 }, { pack: `Erstellt für`, keepScale: true, author: `${a.username}`, discord: "907573119433187329" })
        } catch (e) {
            await b.reply(a.from, `Das Video is zu groß.`, a.id)
        }
    } else if (a.quotedMsg && a.quotedMsg.type == 'video' || a.quotedMsg && a.quotedMsg.mimetype == 'image/gif') {
        await b.react(a.message.id, '👍')
        try {
            const mediaData = await decryptMedia(a.quotedMsg, uaOverride)
            await b.sendMp4AsSticker(a.from, mediaData, { fps: 10, startTime: `00:00:00.0`, endTime: `00:00:10.0`, loop: 0 }, { pack: `Erstellt für`, keepScale: true, author: `${a.username}`, discord: "907573119433187329" })
        } catch (e) {
            await b.reply(a.from, `Das Video is zu groß.`, a.id)
        }
    } else {
        b.sendText(a.from, 'Du musst ein Bild oder ein GIF markieren!')
    }



}
const helpobj = {
    'command': `sticker`,
    'categorie': 'Sticker',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `sticker _bild markieren oder direkt drunter schreiben_`,
    'permission': 'foruser',
    'description': 'Macht aus einem Bild oder Video einen Sticker.'
};

module.exports = {
    sticker,
    helpobj
}
