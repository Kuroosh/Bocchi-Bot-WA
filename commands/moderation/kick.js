async function kick(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    const Justin_Inhaber = "491746583474@c.us"
    const Nando_Inhaber = "491628839189@c.us"
    const Rey_Inhaber = "491747491274@c.us"
    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (!a.isGroupAdmins && !isLeitung) return await b.reply(a.from, eng.adminOnly(), a.id)
    if (!a.isBotGroupAdmins) return await b.reply(a.from, eng.botNotAdmin(), a.id)
    if (a.mentionedJidList.length !== 0) {
        await b.sendTextWithMentions(a.from, `Good bye~\n${a.mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
        if (a.mentionedJidList.length === 0) return await b.reply(a.from, eng.wrongFormat(), a.id)
        if (a.mentionedJidList[0] === a.botNumber) return await b.reply(a.from, eng.wrongFormat(), a.id)
        for (let i of a.mentionedJidList) {
            if (a.groupAdmins.includes(i)) return await b.sendText(a.from, `Du kannst keine Admins kicken!`)
            if (Justin_Inhaber.includes(i)) return await b.sendText(a.from, `Du kannst keine Owner kicken!`)
            if (Nando_Inhaber.includes(i)) return await b.sendText(a.from, `Du kannst keine Owner kicken!`)
            if (Rey_Inhaber.includes(i)) return await b.sendText(a.from, `Du kannst keine Owner kicken!`)
            await b.removeParticipant(a.groupId, i)
        }
    } else if (a.quotedMsg) {
        var getQuoted = a.quotedMsgObj.sender.id
        await b.sendTextWithMentions(a.from, `Tschüss\n@${getQuoted}`)
        if (a.groupAdmins.includes(getQuoted)) return await b.sendText(a.from, `Du kannst keine Admins kicken!`)
        if (Justin_Inhaber.includes(getQuoted)) return await b.sendText(a.from, `Du kannst keine Owner kicken!`)
        if (Nando_Inhaber.includes(getQuoted)) return await b.sendText(a.from, `Du kannst keine Owner kicken!`)
        if (Rey_Inhaber.includes(getQuoted)) return await b.sendText(a.from, `Du kannst keine Owner kicken!`)
        await b.removeParticipant(a.groupId, getQuoted)
    }

}
const helpobj = {
    'command': `kick`,
    'categorie': 'Moderation',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `kick @person1 @person2`,
    'permission': 'foruser',
    'description': 'Kickt einen oder mehrere Nutzer aus der Gruppe'
};

module.exports = {
    kick,
    helpobj
}