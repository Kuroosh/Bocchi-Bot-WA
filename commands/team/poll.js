async function poll(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)
    if (!isLeitung) return await b.reply(a.from, eng.leitungOnly(), a.id)

    var pollauslesen = await a.db.getAll('pollset', 'umfrage')
    var pollauslesens = '';
    pollauslesen.forEach(e => pollauslesens += e);
    var poll = ''
    for (let i = 1; i < a.args.length; i++)
        poll += a.args[i] + " "
    if (a.ar[0] == 'set') {
        try {
            await a.db.addNoCatch('pollset', { id: '1', umfrage: poll })
            await b.reply(a.from, `Umfrage erfolgreich gesetzt`, a.id)//set umfrage
            await b.reply(a.from, `Umfrage bereits gesetzt bitte nutze ${a.prefix}poll delete`, a.id)//set umfrage
        } catch (err) {

        }
    } else if (a.ar[0] == 'delete') {
        try {
            await a.db.removeIdNoCatch('pollset', '1')
            await a.db.cleartableNoCatch('vote')
            await b.reply(a.from, `Erfolgreich!`, a.id)
        } catch (err) {
            await b.reply(a.from, `Es ist keine Umfrage Vorhanden bitte setze eine mit ${prefix}poll set`, a.id)//set umfrage
        }
    } else {
        var poll1 = await a.db.countWhere('vote', { 'vote1': '1' })
        var poll2 = await a.db.countWhere('vote', { 'vote2': '1' })
        const voteuser = await a.db.count('vote')
        if (!isLeitung) {
            b.reply(a.from, '── *「  UMFRAGE  」* ──\n' + pollauslesens + `\n\nVoten mit:\n/poll 1 \noder\n/poll 2\n\nBisher haben ${voteuser} Personen abgestimmt!`, a.id)//gib die gesetzte umfrage aus
        } else {
            b.reply(a.from, '── *「  UMFRAGE  」* ──\n' + pollauslesens + `\n\nVoten mit:\n/poll 1 \noder\n/poll 2\n\nBisher haben ${voteuser} Personen abgestimmt!\nDavon ${poll1} für 1 und ${poll2} für 2`, a.id)//gib die gesetzte umfrage aus
        }
    }

}
const helpobj = {
    'command': `poll`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `poll set / delete `,
    'permission': 'poll',
    'description': 'Setzt eine Umfrage oder löscht diese.'
};

module.exports = {
    poll,
    helpobj
}