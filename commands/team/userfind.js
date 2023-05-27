async function userfind(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isModerator = await getRang('isModerator', a.sender.id, a.db)

    if (!isModerator) return await b.reply(a.from, eng.modOnly(), a.id)
    var usertocheck = a.q.replace(/^0+/, '49').replace(/\D/g, '') + '@c.us'
    var groupidscheck = await b.getAllChatIds(true)
    let textausgabe;
    for (i = 0; i < groupidscheck.length; i++) {
        var memberstocheck = await b.getGroupMembersId(groupidscheck[i])
        if (memberstocheck.includes(usertocheck)) {
            var groupname = await b.getChatById(groupidscheck[i])
            textausgabe += groupname.name + '\n'
            textausgabe += groupname.id + '\n\n'
        }
    }
    if (textausgabe == null) {
        await b.react(a.id, '❌')
    } else {
        await b.react(a.id, '✅️')
        await b.sendText(a.from, textausgabe.replace('undefined', ''))
    }
}
const helpobj = {
    'command': `userfind`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `userfind _nummer_`,
    'permission': 'userfind',
    'description': 'Zeigt alle Gruppen an, in denen sich die Nummer befindet.'
};

module.exports = {
    userfind,
    helpobj
}