async function amongus(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    if (!isRegistered) return await b.reply(from, eng.notRegistered(), id)
    a.fun.amongus()
        .then(async (body) => {
            const amongusg = body.split('\n')
            const amongusgx = amongusg[Math.floor(Math.random() * amongusg.length)]
            await b.sendStickerfromUrl(a.from, amongusgx)
        })
        .catch(async (err) => {
            console.error(err)
            await b.reply(a.from, 'Error!', a.id)
        })



}
const helpobj = {
    'command': `amongus`,
    'categorie': 'Sticker',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `amongus`,
    'permission': 'foruser',
    'description': 'Sendet Amongus Sticker.'
};

module.exports = {
    amongus,
    helpobj
}
