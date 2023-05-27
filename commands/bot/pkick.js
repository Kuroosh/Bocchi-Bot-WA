async function pkick(a, b, eng) {
    await b.sendText(a.from, `Es werden nun alle Personen und bots gekickt die auf der Blacklist stehen!`)
    try {
        const members = await b.getGroupMembers(a.groupId)
        for (var i = 0; i < members.length; i++) {
            const isBitch = await a.db.containsNeu('testdb', { 'id': members[i].id });
            console.log(isBitch)
            if (isBitch) {
                await b.removeParticipant(a.from, members[i].id)
            }
        }
        await b.sendText(a.from, `Erfolgreich alle Nummern gekickt die auf der Blacklist gelistet sind!`)
    } catch (err) {
        await b.sendText(a.from, err + '')
    }
}
const helpobj = {
    'command': `pkick`,
    'categorie': 'Bot',
    'alias': ['pornkick'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `pkick`,
    'permission': 'foruser',
    'description': 'Kickt Alle Leute die auf der Blacklist Stehen.'
};

module.exports = {
    pkick,
    pornkick: pkick,
    helpobj
}