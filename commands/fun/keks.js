async function keks(a, b, eng) {
    if (!a.q) return await b.reply(a.from, eng.kfshalone(), a.id)
    await b.sendTextWithMentions(a.from, eng.keks(a.sender.id, a.q))
}
const helpobj = {
    'command': `keks`,
    'categorie': 'Fun',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `keks _@person_`,
    'permission': 'foruser',
    'description': 'Schenke jemanden in der Gruppe einen Keks.'
};

module.exports = {
    keks,
    helpobj
}
