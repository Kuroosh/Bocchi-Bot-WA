async function animesticker(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)

    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    a.weeaboo.snime()
        .then(async (body) => {
            const wifegerak = body.split('\n')
            const wifegerakx = wifegerak[Math.floor(Math.random() * wifegerak.length)]
            await b.sendStickerfromUrl(a.from, wifegerakx)
        })
        .catch(async (err) => {
            console.error(err)
            await b.reply(a.from, 'Error!', a.id)
        })


}
const helpobj = {
    'command': `animesticker`,
    'categorie': 'Sticker',
    'alias': ['asticker'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `animesticker`,
    'permission': 'foruser',
    'description': 'Sendet ein Bild von Animes.'
};

module.exports = {
    animesticker,
    asticker: animesticker,
    helpobj
}
