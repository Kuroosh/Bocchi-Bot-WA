
async function groupicon(a, b, eng) {
    const decryptMedia = require('@open-wa/wa-automate').decryptMedia;
    const uaOverride = a.configjson.uaOverride
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (!a.isGroupAdmins && !isLeitung) return await b.reply(a.from, eng.adminOnly(), a.id)
    if (!a.isBotGroupAdmins) return b.reply(a.from, eng.botNotAdmin(), a.id)
    if (a.isMedia && a.isImage || a.isQuotedImage) {
        await b.react(a.message.id, '👍')
        const encryptMedia = a.isQuotedImage ? a.quotedMsg : a.message
        const _mimetype = a.isQuotedImage ? a.quotedMsg.mimetype : a.message.mimetype
        const mediaData = await decryptMedia(encryptMedia, uaOverride)
        const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
        await b.setGroupIcon(a.groupId, imageBase64)
        await b.react(a.message.id, '🆗')
    } else {
        await b.reply(a.from, eng.wrongFormat(), a.id)
    }
}
const helpobj = {
    'command': `groupicon`,
    'categorie': 'Moderation',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `groupicon _bild_`,
    'permission': 'foruser',
    'description': 'Setzt das markierte Bild als Gruppenbild.'
};

module.exports = {
    groupicon,
    helpobj
}
