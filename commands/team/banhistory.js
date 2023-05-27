async function banhistory(a, b, eng) {
  if (!a.q) return await b.reply(a.from, `Bitte gib eine Nummer an.`, a.id);
  var { getRang } = a.importFresh('../../lib/rang.js')
  var isTeam = await getRang('isTeam', a.sender.id, a.db)
  if (!isTeam) return await b.reply(a.from, eng.teamOnly(), a.id)

  const banList = await a.db.getFromAllWithWhere('banhistory', { id: a.q.replace(/^0+/, '49').replace(/\D/g, '') + '@c.us' });

  if (!banList || !banList.length) return await b.reply(a.from, `Keine Ban-Historie für diese Nummer gefunden.`, a.id);

  let message = `Hier die Banhistory der ID ${a.q.replace(/^0+/, '49').replace(/\D/g, '') + '@c.us'}\n\n`;

  for (let i = 0; i < banList.length; i++) {
    const ban = banList[i];
    if (ban.ban === '1') {
      message += `Gebannt am: ${formatDate(ban.BanZeitPunkt)} Uhr\n`;
      message += `Ablaufdatum: ${ban.permant ? 'Dauerhaft' : (ban.ablauf ? formatDate(ban.ablauf) : 'Nicht festgelegt')}\n`;
      message += `Gebannt von: ${ban.ersteller}\n`;
      if (ban.grund) {
        message += `Grund: ${ban.grund}\n`;
      }
    } else if (ban.unban === '1') {
      message += `Entbannt am: ${formatDate(ban.BanZeitPunkt)} Uhr\n`;
      message += `von: ${ban.ersteller}\n`;
    }
    message += '\n';
  }

  await b.reply(a.from, message, a.id);
}

function formatDate(date) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const formattedDate = new Date(date).toLocaleString('de-DE', options);
  return formattedDate;
}

const helpobj = {
  'command': `banhistory`,
  'categorie': 'Team',
  'alias': ['no alias'],
  'usage': `banhistory _nummer_`,
  'permission': 'banhistory',
  'description': 'Zeigt den Un-/Ban-Verlauf einer Rufnummer an.'
};

module.exports = {
  banhistory,
  helpobj
}