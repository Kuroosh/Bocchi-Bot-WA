
async function react(a, b, eng) {
    if (a.q == undefined || a.q == 'undefined') return await b.sendText(a.from, 'Bitte makiere eine Nachricht und schreib das entsprechende Emoji')
    await b.react(a.quotedMsgObj.id, a.q)
}
const helpobj = {
    'command': `react`,
    'categorie': 'Bot',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `react _emoji_ (du musst eine nachricht markieren)`,
    'permission': 'foruser',
    'description': 'Reagiert auf die Markierte Nachricht.'
};

module.exports = {
    react,
    helpobj
}
