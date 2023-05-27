async function registerhistory(a, b, eng) {
    if (!a.q) return await b.reply(a.from, `Bitte gib eine Nummer an.`, a.id);
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isTeam = await getRang('isTeam', a.sender.id, a.db)
    if (!isTeam) return await b.reply(a.from, eng.teamOnly(), a.id)

    const RegisterList = await a.db.getFromAllWithWhere('registerhistory', { id: a.q.replace(/^0+/, '49').replace(/\D/g, '') + '@c.us' });

    if (!RegisterList || !RegisterList.length) return await b.reply(a.from, `Keine Register-Historie für diese Nummer gefunden.`, a.id);

    let message = `_Hier die Registerhistory der ID_ *+${a.q.replace(/^0+/, '49').replace(/\D/g, '')}*\n\n`;

    for (let i = 0; i < RegisterList.length; i++) {
        const Rl = RegisterList[i];
        message += `_Registrierung geändert am:_ *${formatDate(Rl.registerzeitpunkt)}*\n`;
        message += `_Name:_ *${Rl.oldname}* -> *${Rl.newname}*\n`;
        message += `_Alter:_ *${Rl.oldage}* -> *${Rl.newage}*\n`
        message += '\n'

    }
    await b.reply(a.from, message, a.id);
}
function formatDate(date) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formattedDate = new Date(date).toLocaleString('de-DE', options);
    return formattedDate;
}


const helpobj = {
    'command': `registerhistory`,
    'categorie': 'Team',
    'alias': ['no alias'],
    'usage': `registerhistory _nummer_`,
    'permission': 'registerhistory',
    'description': 'Zeigt die Registerhistory einer Rufnummer an.'
};

module.exports = {
    registerhistory,
    rh: registerhistory,
    helpobj
}