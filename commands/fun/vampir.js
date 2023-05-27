async function vampir(a, b, eng) {
    if (!a.q) return await b.reply(a.from, eng.kfshalone(), a.id)
    await b.sendTextWithMentions(a.from, eng.vampir(a.sender.id, a.q))
}
const helpobj = {
    'command': `vampir`,
    'categorie': 'Fun',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `vampir _@person_`,
    'permission': 'foruser',
    'description': 'Beiße jemanden in der Gruppe.'
};

module.exports = {
    vampir,
    helpobj
}
