async function lenny(a, b, eng) {
    await b.sendText(a.from, `( ͡° ͜ʖ ͡°)`)
}
const helpobj = {
    'permission': 'foruser',
};

module.exports = {
    lenny,
    helpobj
}