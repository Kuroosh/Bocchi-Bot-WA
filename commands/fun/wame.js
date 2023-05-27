async function wame(a, b, eng) {
    await b.sendText(a.from, `wa.me/${a.q.replace(/^0+/, '49').replace(/\D/g, '')}`)
}
const helpobj = {
    'command': `wame`,
    'categorie': 'Fun',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `wame _(nummer nicht im Format)_`,
    'permission': 'foruser',
    'description': 'Sendet einen wa.me Link für die Nummer im richtigen Format.'
};

module.exports = {
    wame,
    helpobj
}