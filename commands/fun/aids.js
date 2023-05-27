async function aids(a, b, eng) {
    if (!a.q) return await b.reply(a.from, eng.kfshalone(), a.id)
    await b.sendTextWithMentions(a.from, eng.aids(a.sender.id, a.q))
}
const helpobj = {
    'command': `aids`,
    'categorie': 'Fun',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `aids _@person_`,
    'permission': 'foruser',
    'description': 'Infiziere jemanden in der Gruppe mit HIV.'
};

module.exports = {
    aids,
    helpobj
}
