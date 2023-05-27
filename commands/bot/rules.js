async function rules(a, b, eng) {
    await b.sendText(a.from, eng.rules())
}
const helpobj = {
    'command': `rules`,
    'categorie': 'Bot',
    'alias': ['regeln', 'regel'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `rules`,
    'permission': 'foruser',
    'description': 'Zeigt die Regeln des Bots.'
};

module.exports = {
    rules,
    regeln: rules,
    regel: rules,
    helpobj
}