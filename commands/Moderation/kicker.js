async function kicker(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)

    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)
    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (!a.isBotGroupAdmins) return await b.reply(a.from, eng.botNotAdmin(), a.id)
    if (!a.isGroupAdmins && !isLeitung) return await b.sendText(a.from, eng.adminOnly())
    if (a.args[0] == 4) return await b.reply(a.from, `DENK NICHT DRAN!`, a.id)
    await b.react(a.message.id, '👍')
    let txt = '[KICKERLISTE]\n_Admins werden nicht gekickt!_\n'
    try {
        const members = await b.getGroupMembersId(a.groupId)
        const filtered = [];
        for (let i = 0; i < members.length; i++) {
            if (members[i].startsWith(a.args[0])) {
                filtered.push(members[i])
            }
        }
        if (filtered.length > 0) {
            let kickedUser = [];

            for (let i = 0; i < filtered.length; i++) {
                const isGroupAdmins = a.isGroupMsg ? a.groupAdmins.includes(filtered[i]) : false
                let icon = isGroupAdmins ? '✅️ Admin' : '❌ Kick';
                if (!isGroupAdmins) {
                    kickedUser.push(filtered[i])
                } else {
                    txt += `@${filtered[i].replace('@c.us', '')} ${icon}\n`
                }
            }

            b.sendTextWithMentions(a.from, txt + '').then(() => {
                for (let i in kickedUser)
                    b.removeParticipant(a.groupId, kickedUser[i]).catch(console.log);
            });

        } else {
            await b.reply(a.from, `Eine Nummer die mit +${a.args[0]} wurde nicht gefunden!`, a.id)
        }
    } catch (err) {
        console.error(err)
        await b.reply(a.from, err + 'Error!', a.id)
    }
}
const helpobj = {
    'command': `kicker`,
    'categorie': 'Moderation',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `kicker _start-der-nr_`,
    'permission': 'foruser',
    'description': 'Kickt alle die mit der Nummer beginnen.'
};
module.exports = {
    kicker,
    helpobj
}
