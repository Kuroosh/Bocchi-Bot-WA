async function nudes(a, b, eng) {
    if (!a.q) return await b.reply(a.from, eng.kfshalone(), a.id)
    await b.sendTextWithMentions(a.from, eng.nudes(a.sender.id, a.q))
}
const helpobj = {
    'command': `nudes`,
    'categorie': 'Fun',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `nudes _@person_`,
    'permission': 'foruser',
    'description': 'Frage jemanden in der Gruppe nach Nacktbildern.'
};

module.exports = {
    nudes,
    helpobj
}
