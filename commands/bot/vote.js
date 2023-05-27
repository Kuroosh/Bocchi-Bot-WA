async function vote(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isOwner = await getRang('isOwner', a.sender.id, a.db)

    var pollauslesen = await a.db.getAll('pollset', 'umfrage')
    var pollauslesens = '';
    pollauslesen.forEach(e => pollauslesens += e);
    if (a.ar[0] == '1') {
        try {
            await a.db.addNoCatch('vote', { id: a.sender.id, vote1: '1', vote2: '0' })
            await b.reply(a.from, `Danke für deine Abstimmung!`, a.id)//stimme (2) +1
        } catch (err) {
            await b.reply(a.from, `Du hast bereits abgestimmt`, a.id)//set umfrage
        }
    } else if (a.ar[0] == '2') {
        try {
            await a.db.addNoCatch('vote', { id: sender.id, vote1: '0', vote2: '1' })
            await b.reply(a.from, `Danke für deine Abstimmung!`, a.id)//stimme (2) +1
        } catch (err) {
            await b.reply(a.from, `Du hast bereits abgestimmt`, a.id)//set umfrage
        }
    } else {
        var poll1 = await a.db.countWhere('vote', { 'vote1': '1' })
        var poll2 = await a.db.countWhere('vote', { 'vote2': '1' })
        const voteuser = await a.db.count('vote')
        if (!isOwner) {
            b.reply(a.from, '── *「  UMFRAGE  」* ──\n' + pollauslesens + `\n\nVoten mit:\n/poll 1 \noder\n/poll 2\n\nBisher haben ${voteuser} Personen abgestimmt!`, a.id)//gib die gesetzte umfrage aus
        } else {
            b.reply(a.from, '── *「  UMFRAGE  」* ──\n' + pollauslesens + `\n\nVoten mit:\n/poll 1 \noder\n/poll 2\n\nBisher haben ${voteuser} Personen abgestimmt!\nDavon ${poll1} für 1 und ${poll2} für 2`, a.id)//gib die gesetzte umfrage aus
        }
    }

}
const helpobj = {
    'command': `vote`,
    'categorie': 'Bot',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `vote`,
    'permission': 'foruser',
    'description': 'Stimme bei der vohandenen Umfrage ab.'
};

module.exports = {
    vote,
    helpobj
}