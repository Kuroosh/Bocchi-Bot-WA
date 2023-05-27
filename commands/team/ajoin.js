async function ajoin(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)
    if (!isLeitung) return await b.reply(a.from, eng.leitungOnly(), a.id)

    const ojoingrpid = a.args[0]
    const gcInfo4 = await b.inviteInfo(ojoingrpid) //Gruppenbeschreibung
    const config = b.getConfig()
    var gcInfoGroupId = ''
    if (config.multiDevice == true || config.multiDevice == "true") {
        gcInfoGroupId = gcInfo4.groupMetadata.id
    } else {
        gcInfoGroupId = gcInfo4.id
    }
    await a.db.addGroupinfoMitWert('welcome', { 'id': gcInfoGroupId, 'wert': 0 })
    await a.db.addGroupinfoMitWert('kickfilter', { 'id': gcInfoGroupId, 'wert': 0 })
    await b.joinGroupViaLink(a.url).then(async (groupid) => {
        await a.sleep(1500)
        await b.sendText(groupid, `Hallo das Teammitglied ${a.sender.username} hat mich in die Gruppe geschickt. \n\nViel Spaß.\n\n_Information! Alle Gruppeneinstellungen sind wie vorher außer welcome siehe ${a.prefix}gi_`)
    })
    await b.react(a.message.id, '🆗')
}
const helpobj = {
    'command': `ajoin`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `ajoin _gruppenlink_`,
    'permission': 'ajoin',
    'description': 'Lässt alle erreichten Bots joinen.'
};

module.exports = {
    ajoin,
    helpobj
}
