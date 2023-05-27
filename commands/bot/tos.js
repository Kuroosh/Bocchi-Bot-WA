async function tos(a, b, eng) {
    await b.sendText(a.from, eng.tos())
}

const helpobj = {
    'command': `tos`,
    'categorie': 'Bot',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `tos`,
    'permission': 'foruser',
    'description': 'Nennt die Originale Terms of Service (AGB) vom Bocchi Ersteller.'
};
module.exports = {
    helpobj,
    tos,
}