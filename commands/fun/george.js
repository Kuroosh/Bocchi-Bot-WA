async function george(a, b, eng) {
    await b.sendText(a.from, 'George not found')
}
const helpobj = {
    'permission': 'foruser',
};

module.exports = {
    george,
    helpobj
}