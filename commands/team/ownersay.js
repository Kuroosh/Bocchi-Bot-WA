async function ownersay(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isOwner = await getRang('isOwner', a.sender.id, a.db)
    if (!isOwner) return await b.reply(a.from, eng.ownerOnly(), a.id)
    const ownersaynr = a.q.substring(0, a.q.indexOf('|') - 1)
    const ownersaymsg = a.q.substring(a.q.lastIndexOf('|') + 2)
    await b.sendText(ownersaynr, `*── 「 OWNERINFO 」 ──*\n\n${ownersaymsg}`)
    await b.sendText(a.from, `*── 「 OWNERINFO 」 ──*\nNachricht erfolgreich an die Person/Gruppe weitergeleitet!`)
}
const helpobj = {
    'command': `ownersay`,
    'categorie': 'Team',
    'alias': ['os'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `ownersay _id | Text_`,
    'permission': 'ownersay',
    'description': 'Sende eine Nachricht über den Bot an die Gruppe.'
};

module.exports = {
    ownersay,
    os: ownersay,
    helpobj
}
