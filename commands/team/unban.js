async function unban(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isModerator = await getRang('isModerator', a.sender.id, a.db)
    if (!isModerator) return await b.reply(a.from, eng.modOnly(), a.id)
    var bancheckid = a.q.replace(/[ +()-]/g, '').replace(/\D/g, '') + '@c.us'
    var bancheck = await a.db.containsId('banned', bancheckid)
    var bancheckobjekt = await a.db.getId('banned', bancheckid)
    var bancheckcheck = bancheck ? `*gebannt* für den Grund:\n${bancheckobjekt.grund}\nGebannt von: \nwa.me/${bancheckobjekt.ersteller.replace(/[ +()-]/g, '').replace(/\D/g, '')}\nam ${bancheckobjekt.BanZeitpunkt}` : '*nicht gebannt*'

    if (bancheck === false) return await b.reply(a.from, `Der User mit der Id: \nwa.me/${bancheckid.replace(/[ +()-]/g, '').replace(/\D/g, '')} ist ${bancheckcheck}`, a.id)

    if (a.mentionedJidList.length !== 0) {
        if (a.mentionedJidList[0] === a.botNumber) return await b.reply(a.from, eng.wrongFormat(), a.id)
        await a.db.removeId('banned', a.mentionedJidList[0]);
        await b.react(a.message.id, '☑️')

    } else {
        //20.04.2023 Banhistory ~Nando

        await a.db.add('banhistory', { id: a.q.replace(/^0+/, '49').replace(/\D/g, '') + '@c.us', 'ersteller': a.sender.id, 'ban': '0', 'unban': '1' })

        await a.db.removeId('banned', a.q.replace(/^0+/, '49').replace(/\D/g, '') + '@c.us');
        await b.react(a.message.id, '☑️')
        await b.sendTextWithMentions(a.RegGroupID, `Unban ausgeführt von @${a.sender.id.replace('@c.us', '')}!\n\nUser: wa.me/${a.q.replace(/^0+/, '49').replace(/\D/g, '') + '@c.us'}\n\n\nDer User mit der Id: \nwa.me/${bancheckid.replace(/[ +()-]/g, '').replace(/\D/g, '')} war ${bancheckcheck}`)

    }
}
const helpobj = {
    'command': `unban`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `unban _nummer_`,
    'permission': `unban`,
    'description': 'Entbannt die Nummer.'
};

module.exports = {
    unban,
    helpobj
}