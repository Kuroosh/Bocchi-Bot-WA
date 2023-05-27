// async function ownerbot(a, b, eng) {
//     const dataJson1 = await a.db.getFromAllWithWhere('team', { 'typ': 'Inhaber' })
//     const dataJson2 = await a.db.getFromAllWithWhere('team', { 'typ': 'StvInhaber' })
//     let txt = ''
//     for (let i = 0; i < dataJson1.length; i++) {
//         txt += '\n' + dataJson1[i].name + '  ->  ' + '@' + dataJson1[i].id.replace('@c.us', '') + '\nwa.me/' + dataJson1[i].id.replace('@c.us', '')
//     }
//     for (let i = 0; i < dataJson2.length; i++) {
//         txt += '\n' + dataJson2[i].name + '  ->  ' + '@' + dataJson2[i].id.replace('@c.us', '') + '\nwa.me/' + dataJson2[i].id.replace('@c.us', '')
//     }
//     await b.sendTextWithMentions(a.from, eng.ownerbot(txt))
// }

// module.exports = {
//     ownerbot
// }
async function ob(a, b, eng) {
    await b.sendText(a.from, 'Hier erreichst du jemanden im Team\nhttps://discord.gg/QNvJDu7va7')

}
const helpobj = {
    'command': `ob`,
    'categorie': 'Bot',
    'alias': ['ownerbot'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `ob`,
    'permission': 'foruser',
    'description': 'Gibt dir Kontaktmöglichkeiten an das Team.'
};

module.exports = {
    ob,
    ownerbot: ob,
    helpobj
}
