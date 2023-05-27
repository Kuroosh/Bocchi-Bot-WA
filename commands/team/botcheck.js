async function botcheck(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isTeam = await getRang('isTeam', a.sender.id, a.db)
    if (!isTeam) return b.reply(a.from, eng.adminOnly(), a.id)

    if (a.isMe) {
        var hosts = await a.db.getOnline()
        var hostserror = await a.db.getError()
        var text = `*── 「 HOSTS 」 ──*\n_sessionid - status: online/errorcheck_\n`
        for (var i = 0; i < hosts.length; i++) {
            for (var i = 0; i < hostserror.length; i++) {
                var icon = ''
                if (hosts[i].online == true || hosts[i].online == "true") {
                    icon = '✅️'
                } else {
                    icon = '📴'
                }
                var icon2 = ''
                if (hostserror[i].errorcheck == true || hostserror[i].errorcheck == "true") {
                    icon2 = '✅️'
                } else {
                    icon2 = '❌'
                }
                text = text + `\`\`\`${i + 1}.\`\`\` *${hosts[i].id}* - _Status:_ ${icon}${icon2} \n`
            }
        }
        b.sendText(a.from, text)
    }
}
const helpobj = {
    'command': `botcheck`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `botcheck`,
    'permission': 'botcheck',
    'description': 'Zeigt eine Liste mit aktiven Hosts.'
};

module.exports = {
    botcheck,
    helpobj
}
