async function membercheck(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)
    if (!a.isGroupAdmins && !isLeitung) return await b.reply(a.from, eng.adminOnly(), a.id)

    var starts = a.args[0]
    await b.react(a.message.id, '👍')
    let txt = `[MEMBERLISTE]\n\n`
    try {
        const members = await b.getGroupMembersId(a.groupId)
        const filtered = [];
        for (let i = 0; i < members.length; i++) {
            if (members[i].startsWith(starts)) {
                filtered.push(members[i])
            }
        }
        if (filtered.length > 0) {
            txt += `Es sind insgesamt _${filtered.length}_ Nummern die mit *+${starts}* beginnen.`
            txt += '\n✅️ = ```Admin```\n❌ = ```Kein admin```\n\n'
            for (let i = 0; i < filtered.length; i++) {
                const isGroupAdmins = a.isGroupMsg ? a.groupAdmins.includes(filtered[i]) : false
                let icon = isGroupAdmins ? '✅️' : '❌';
                txt += `@${filtered[i].replace('@c.us', '')} ${icon}\n`
            }

            b.sendTextWithMentions(a.from, txt + '')

        } else {
            await b.reply(a.from, `Eine Nummer die mit *+${starts}* startet konnte ich leider *nicht* finden!`, a.id)
        }
    } catch (err) {
        console.error(err)
        await b.reply(a.from, err + 'Error!', a.id)
    }
}
const helpobj = {
    'command': `membercheck`,
    'categorie': 'Moderation',
    'alias': ['member'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `membercheck _vorwahl_`,
    'permission': 'foruser',
    'description': 'Sendet Liste mit Nummern die mit dieser Vorwahl beginnen.\n_(admin check inklusive)_'
};

module.exports = {
    membercheck,
    member: membercheck,
    helpobj
}