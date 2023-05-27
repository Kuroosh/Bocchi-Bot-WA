async function kyck(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    const Justin_Inhaber = "491746583474@c.us"
    const Nando_Inhaber = "491628839189@c.us"
    const Rey_Inhaber = "491747491274@c.us"

    const kickrandom1 = await b.getGroupMembers(a.groupId)
    const kickrandom2 = kickrandom1[Math.floor(Math.random() * (kickrandom1.length))]
    var kyck = kickrandom2.id
    if (Justin_Inhaber.includes(kyck)) return await b.sendTextWithMentions(a.from, `── *「  KICKRANDOM  」* ──\n\nDurch Kickrandom würde @${kyck.replace('@c.us', '')} gekickt werden...\nAllerdings ist dies ein Owner!`)
    if (Nando_Inhaber.includes(kyck)) return await b.sendTextWithMentions(a.from, `── *「  KICKRANDOM  」* ──\n\nDurch Kickrandom würde @${kyck.replace('@c.us', '')} gekickt werden...\nAllerdings ist dies ein Owner!`)
    if (Rey_Inhaber.includes(kyck)) return await b.sendTextWithMentions(a.from, `── *「  KICKRANDOM  」* ──\n\nDurch Kickrandom würde @${kyck.replace('@c.us', '')} gekickt werden...\nAllerdings ist dies ein Owner!`)
    if (a.groupAdmins.includes(kyck)) return await b.sendTextWithMentions(a.from, `── *「  KICKRANDOM  」* ──\n\nDurch Kickrandom würde @${kyck.replace('@c.us', '')} gekickt werden...\nAllerdings ist dies ein Admin!`)
    await b.sendTextWithMentions(a.from, `── *「  KICKRANDOM  」* ──\n\nDurch Kickrandom wird heute  @${kyck.replace('@c.us', '')} gekickt! \n`)
    // await b.removeParticipant(groupId, kyck)


}
const helpobj = {
    'command': `kyck`,
    'categorie': 'Fun',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `kyck`,
    'permission': 'foruser',
    'description': 'Kickt random jemanden aus der Gruppe.'
};

module.exports = {
    kyck,
    helpobj
}
