async function doge(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    a.fun.doge()
        .then(async (body) => {
            const dogeg = body.split('\n')
            const dogegx = dogeg[Math.floor(Math.random() * dogeg.length)]
            await b.sendStickerfromUrl(a.from, dogegx)
        })
        .catch(async (err) => {
            console.error(err)
            await b.reply(a.from, 'Error!', a.id)
        })



}
const helpobj = {
    'command': `doge`,
    'categorie': 'Sticker',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `doge`,
    'permission': 'foruser',
    'description': 'Sendet einen Sticker eines Hundes.'
};

module.exports = {
    doge,
    helpobj
}
