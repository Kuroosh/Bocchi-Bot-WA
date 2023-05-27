async function patrick(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)

    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    a.fun.patrick()
        .then(async (body) => {
            const patrickg = body.split('\n')
            const patrickgx = patrickg[Math.floor(Math.random() * patrickg.length)]
            await b.sendStickerfromUrl(a.from, patrickgx)
        })
        .catch(async (err) => {
            console.error(err)
            await b.reply(a.from, 'Error!', a.id)
        })


}
const helpobj = {
    'command': `patrick`,
    'categorie': 'Sticker',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `patrick`,
    'permission': 'foruser',
    'description': 'Sendet Sticker von Patrick.'
};

module.exports = {
    patrick,
    helpobj
}
