async function anim(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)

    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    a.fun.anim()
        .then(async (body) => {
            const animg = body.split('\n')
            const animgx = animg[Math.floor(Math.random() * animg.length)]
            await b.sendStickerfromUrl(a.from, animgx)
        })
        .catch(async (err) => {
            console.error(err)
            await b.reply(a.from, 'Error!', a.id)
        })


}
const helpobj = {
    'command': `anim`,
    'categorie': 'Sticker',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `anim`,
    'permission': 'foruser',
    'description': 'Sendet Anime Sticker.'
};

module.exports = {
    anim,
    helpobj
}
