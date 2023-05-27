async function fuck(a, b, eng) {
    if (!a.q) return await b.reply(a.from, eng.kfshalone(), a.id)
    await b.sendTextWithMentions(a.from, eng.fuck(a.sender.id, a.q))
}
const helpobj = {
    'command': `fuck`,
    'categorie': 'Fun',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `fuck _@person_`,
    'permission': 'foruser',
    'description': 'Habe Geschlechtsverkehr mit jemanden aus der Gruppe.'
};

module.exports = {
    fuck,
    helpobj
}
