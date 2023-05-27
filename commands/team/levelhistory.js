async function levelhistory(a, b, eng) {
    if (!a.q) return await b.reply(a.from, `Bitte gib eine Nummer an.`, a.id);
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isTeam = await getRang('isTeam', a.sender.id, a.db)
    if (!isTeam) return await b.reply(a.from, eng.teamOnly(), a.id)

    const LevelList = await a.db.getFromAllWithWhere('setlevelhistory', { id: a.q.replace(/^0+/, '49').replace(/\D/g, '') + '@c.us' });

    if (!LevelList || !LevelList.length) return await b.reply(a.from, `Keine Level-Historie für diese Nummer gefunden.`, a.id);

    let message = `_Hier die Levelhistory der ID_ *+${a.q.replace(/^0+/, '49').replace(/\D/g, '')}*\n\n`;

    for (let i = 0; i < LevelList.length; i++) {
        const ll = LevelList[i];
        message += `_Level geändert am:_ *${formatDate($ll.levelzeitpunkt)} *\n`;
        message += `_Geändert von:_ *+${ll.ersteller.replace('@c.us', '')}*\n`;
        message += `_Level:_ *${ll.oldlvl}* -> *${ll.newlvl}*\n`
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
    'command': `levelhistory`,
    'categorie': 'Team',
    'alias': ['no alias'],
    'usage': `levelhistory _nummer_`,
    'permission': 'levelhistory',
    'description': 'Zeigt die Levelhistory einer Rufnummer an.'
};

module.exports = {
    levelhistory,
    lh: levelhistory,
    helpobj
}