async function tritt(a, b, eng) {
    if (!a.q) return await b.reply(a.from, eng.kfshalone(), a.id)
    await b.sendTextWithMentions(a.from, eng.tritt(a.sender.id, a.q))
}
const helpobj = {
    'command': `tritt`,
    'categorie': 'Fun',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `tritt _@person_`,
    'permission': 'foruser',
    'description': 'Trete jemanden in der Gruppe.'
};

module.exports = {
    tritt,
    helpobj
}
