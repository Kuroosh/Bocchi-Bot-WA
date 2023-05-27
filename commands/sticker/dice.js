async function dice(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    a.fun.dice()
        .then(async (body) => {
            const diceg = body.split('\n')
            const dicegx = diceg[Math.floor(Math.random() * diceg.length)]
            await b.sendStickerfromUrl(a.from, dicegx)
        })
        .catch(async (err) => {
            console.error(err)
            await b.reply(a.from, err, a.id)
        })

}
const helpobj = {
    'command': `dice`,
    'categorie': 'Sticker',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `dice`,
    'permission': 'foruser',
    'description': 'Sendet einen Animierten Sticker von einem Würfel.'
};

module.exports = {
    dice,
    helpobj
}
