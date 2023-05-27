async function oeveryone(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isOwner = await getRang('isOwner', a.sender.id, a.db)
    const groupMemo = await b.getGroupMembers(a.groupId)
    if (isOwner) {
        let txto = `╔══✪〘 *EVERYONE* 〙✪══╗\n\n${a.q.replace('+', '')}\n\n`
        for (let i = 0; i < groupMemo.length; i++) {
            txto += ` @${groupMemo[i].id.replace(/@c.us/g, '')}`
        }
        txto += '\n╚══✪〘 *B O C C H I* 〙✪══╝'
        await b.sendTextWithMentions(a.from, txto, true)
    } else {
        await b.sendText(a.from, 'Nö')
    }
}
const helpobj = {
    'command': `oeveryone`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `oeveryone _dein text_`,
    'permission': 'oeveryone',
    'description': 'Markiert alle User mit Hidetag.'
};

module.exports = {
    oeveryone,
    helpobj
}