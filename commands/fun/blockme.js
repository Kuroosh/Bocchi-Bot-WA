async function blockme(a, b, eng) {
    await b.sendTextWithMentions(a.from, `Der User @${a.sender.id.replace(/@c.us/g, '')} wird nun vollständig vom Bot System ausgeschlossen!`)
}
const helpobj = {
    'permission': 'foruser',
};

module.exports = {
    blockme,
    helpobj
}