async function eng(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isModerator = await getRang('isModerator', a.sender.id, a.db)
    if (!isModerator) return await b.reply(a.from, eng.modOnly(), a.id)
    let messages = [];
    for (const key in eng) {
        if (Object.hasOwnProperty.call(eng, key)) {
            messages.push(key);
        }
    }
    await b.sendText(a.from, messages.join('\n'));

}
const helpobj = {
    'command': `eng`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `eng`,
    'permission': 'eng',
    'description': 'Gibt eine Liste aller exports in der "eng.js" aus.'
};

module.exports = {
    eng,
    helpobj
}
