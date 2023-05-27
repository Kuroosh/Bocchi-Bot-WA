async function mark(a, b, eng) {
    if (!a.q) return await b.sendText(a.from, `Bitte gib eine Nummer ohne + und ohne Leerzeichen ein`)
    await b.sendTextWithMentions(a.from, `@${a.q.replace(/[ +()-]/g, '').replace(/^0+/, '49')}`)
}
const helpobj = {
    'permission': 'foruser',
};

module.exports = {
    mark,
    helpobj
}