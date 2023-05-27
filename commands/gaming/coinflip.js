async function coinflip(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    const coinflip = Math.floor(Math.random() * 100) + 1;
    let message;
    if (coinflip >= 1 && coinflip <= 49) {
        message = `Die Münze landete auf: Zahl`;
    } else if (coinflip === 50) {
        message = `Die Münze landete auf: Kante`;
    } else if (coinflip >= 51 && coinflip <= 100) {
        message = `Die Münze landete auf: Kopf`;
    } else {
        message = `Wenn diese Nachricht erscheint, melde die bitte mit ${prefix}report coinflip`;
    }

    await b.reply(a.from, message, a.id);

}
const helpobj = {
    'command': `coinflip`,
    'categorie': 'Gaming',
    'alias': ['muenzwurf', 'muenze', 'münze', 'münzwurf', 'cflip'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `coinflip`,
    'permission': 'foruser',
    'description': 'Wirft eine Münze.'
};

module.exports = {
    coinflip,
    muenzwurf: coinflip,
    muenze: coinflip,
    münze: coinflip,
    münzwurf: coinflip,
    cflip: coinflip,
    helpobj
}
