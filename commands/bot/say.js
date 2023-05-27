async function say(a, b, eng) {
    if (!a.q) return await b.reply(a.from, eng.wrongFormat(), a.id)
    if (a.q.startsWith('#') || a.q.startsWith('!')) return await b.sendText(a.from, 'Zum Schutz anderer Bots darf die Nachricht nicht mit # oder ! beginnen.')
    if (a.q.includes('#')) {
        var say = a.q.replace('#', '')
    } else {
        say = a.q
    }
    await b.sendText(a.from, say + '')
}
const helpobj = {
    'command': `say`,
    'categorie': 'Bot',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `say _dein Text_`,
    'permission': 'foruser',
    'description': 'Schreibt deine Text'
};

module.exports = {
    say,
}