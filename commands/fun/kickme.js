async function kickme(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    await b.removeParticipant(a.from, a.sender.id)
}
const helpobj = {
    'command': `kickme`,
    'categorie': 'Fun',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `kickme`,
    'permission': 'foruser',
    'description': 'Kickt dich aus Der Gruppe.'
};

module.exports = {
    kickme,
    helpobj
}
