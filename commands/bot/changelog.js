async function changelog(a, b, eng) {
    await b.sendText(a.from, eng.changelog())
}
const helpobj = {
    'command': `changelog`,
    'categorie': 'Bot',
    'alias': ['update'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `changelog`,
    'permission': 'foruser',
    'description': 'Sende aktuelle Updates des Bots.'
};

module.exports = {
    changelog,
    update: changelog,
    helpobj
}