async function report(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.q) return await b.reply(a.from, eng.emptyMess(), a.id)
    if (a.isGroupMsg) {
        await b.sendText(a.DevGroupID, `*── 「 REPORT 」 ──*\n\n *From*: ${a.username} \n *ID*: ${a.sender.id} \nwa.me/${a.sender.id.replace('@c.us', '')} \n *Message*: ${a.q} `)
        await b.reply(a.from, eng.received(a.username), a.id)
    } else {
        await b.sendText(a.DevGroupID, `*── 「 REPORT 」 ──*\n\n *From*: ${a.username} \n *ID*: ${a.sender.id} \nwa.me/${a.sender.id.replace('@c.us', '')} \n *Message*: ${a.q} `)
        await b.reply(a.from, eng.received(a.username), a.id)
    }
}
const helpobj = {
    'command': `report`,
    'categorie': 'Bot',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `report _dein-report_`,
    'permission': 'foruser',
    'description': 'Sende uns einen Bug-Report.'
};

module.exports = {
    report,
    helpobj
}