async function bancheck(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isTeam = await getRang('isTeam', a.sender.id, a.db)
    if (!isTeam) return b.reply(a.from, eng.adminOnly(), a.id)

    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    var bancheckid = a.q.replace(/[ +()-]/g, '').replace(/\D/g, '') + '@c.us'
    var bancheck = await a.db.containsId('banned', bancheckid)
    var bancheckobjekt = await a.db.getId('banned', bancheckid)
    var bancheckcheck = bancheck ? `*gebannt* für den Grund:\n${bancheckobjekt.grund}\nGebannt von: \nwa.me/${bancheckobjekt.ersteller.replace(/[ +()-]/g, '').replace(/\D/g, '')}\nam ${formatDate(bancheckobjekt.BanZeitPunkt)} Uhr` : '*nicht gebannt*'
    await b.reply(a.from, `Der User mit der Id: \nwa.me/${bancheckid.replace(/[ +()-]/g, '').replace(/\D/g, '')} ist ${bancheckcheck}`, a.id)
}
function formatDate(date) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formattedDate = new Date(date).toLocaleString('de-DE', options);
    return formattedDate;
}

const helpobj = {
    'command': `bancheck`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `bancheck _nummer_`,
    'permission': 'bancheck',
    'description': 'Überprüft ob die Nummer gebannt ist.'
};


module.exports = {
    bancheck,
    helpobj
}