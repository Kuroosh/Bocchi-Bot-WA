async function kiss(a, b, eng) {
    if (!a.q) return await b.reply(a.from, eng.kfshalone(), a.id)
    await b.sendTextWithMentions(a.from, eng.kiss(a.sender.id, a.q))
}
const helpobj = {
    'command': `kiss`,
    'categorie': 'Fun',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `kiss _@person_`,
    'permission': 'foruser',
    'description': 'Küsse jemanden in der Gruppe.'
};

module.exports = {
    kiss,
    helpobj
}
