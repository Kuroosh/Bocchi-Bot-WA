async function trash(a, b, eng) {
    if (!a.q) return await b.reply(a.from, eng.kfshalone(), a.id)
    await b.sendTextWithMentions(a.from, eng.trash(a.sender.id, a.q))
}
const helpobj = {
    'command': `trash`,
    'categorie': 'Fun',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `trash _@person_`,
    'permission': 'foruser',
    'description': 'Schmeiße jemanden in der Gruppe in die Mülltonne.'
};

module.exports = {
    trash,
    helpobj
}
