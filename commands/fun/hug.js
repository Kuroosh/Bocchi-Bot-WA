async function hug(a, b, eng) {
    if (!a.q) return await b.reply(a.from, eng.kfshalone(), a.id)
    await b.sendTextWithMentions(a.from, eng.hug(a.sender.id, a.q))
}
const helpobj = {
    'command': `hug`,
    'categorie': 'Fun',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `hug _@person_`,
    'permission': 'foruser',
    'description': 'Umarme jemanden in der Gruppe.'
};

module.exports = {
    hug,
    helpobj
}
