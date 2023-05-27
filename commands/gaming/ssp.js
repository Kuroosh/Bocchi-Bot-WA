async function ssp(a, b, eng) {

    const isRegistered = await a.db.containsId('registered', a.sender.id)

    const SSP = ['Schere', 'Stein', 'Papier'];
    const resultSSP = SSP[Math.floor(Math.random() * SSP.length)];

    switch (a.ar[0]) {
        case 'schere':
            if (resultSSP === 'Schere') {
                await b.reply(a.from, `*「 SCHERE STEIN PAPIER 」*\n\nBot hat = Schere\nDu hast = Schere\n\n🔄 Unentschieden 🔄`, a.id);
            } else if (resultSSP === 'Stein') {
                await b.reply(a.from, `*「 SCHERE STEIN PAPIER 」*\n\nBot hat = Stein\nDu hast = Schere\n\n⛔ Bot gewinnt ⛔`, a.id);
            } else if (resultSSP === 'Papier') {
                await b.reply(a.from, `*「 SCHERE STEIN PAPIER 」*\n\nBot hat = Papier\nDu hast = Schere\n\n✅ Spieler gewinnt ✅`, a.id);
            }
            break;

        case 'stein':
            if (resultSSP === 'Schere') {
                await b.reply(a.from, `*「 SCHERE STEIN PAPIER 」*\n\nBot hat = Schere\nDu hast = Stein\n\n✅ Spieler gewinnt ✅`, a.id);
            } else if (resultSSP === 'Stein') {
                await b.reply(a.from, `*「 SCHERE STEIN PAPIER 」*\n\nBot hat = Stein\nDu hast = Stein\n\n🔄 Unentschieden 🔄`, a.id);
            } else if (resultSSP === 'Papier') {
                await b.reply(a.from, `*「 SCHERE STEIN PAPIER 」*\n\nBot hat = Papier\nDu hast = Stein\n\n⛔ Bot gewinnt ⛔`, a.id);
            }
            break;

        case 'papier':
            if (resultSSP === 'Schere') {
                await b.reply(a.from, `*「 SCHERE STEIN PAPIER 」*\n\nBot hat = Schere\nDu hast = Papier\n\n⛔ Bot gewinnt ⛔`, a.id);
            } else if (resultSSP === 'Stein') {
                await b.reply(a.from, `*「 SCHERE STEIN PAPIER 」*\n\nBot hat = Stein\nDu hast = Papier\n\n✅ Spieler gewinnt ✅`, a.id);
            } else if (resultSSP === 'Papier') {
                await b.reply(a.from, `*「 SCHERE STEIN PAPIER 」*\n\nBot hat = Papier\nDu hast = Papier\n\n🔄 Unentschieden 🔄`, a.id);
            }
            break;

        default:
            await b.reply(a.from, `Bitte wähle zwischen Schere, Stein oder Papier.`, a.id);
    }


}
const helpobj = {
    'command': `ssp`,
    'categorie': 'Gaming',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `ssp _schere / stein / papier_`,
    'permission': 'foruser',
    'description': 'Spielt Schere-Stein-Papier mit dem bot.'
};

module.exports = {
    ssp,
    helpobj
}
