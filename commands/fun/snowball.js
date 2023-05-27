async function snowball(a, b, eng) {
    if (!a.q) return await b.reply(a.from, eng.kfshalone(), a.id)
    await b.sendTextWithMentions(a.from, eng.snowball(a.sender.id, a.q))
}
const helpobj = {
    'command': `snowball`,
    'categorie': 'Fun',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `snowball _@person_`,
    'permission': 'foruser',
    'description': 'Werfe jemanden in der Gruppe mit einem Schneeball ab.'
};

module.exports = {
    snowball,
    helpobj
}
