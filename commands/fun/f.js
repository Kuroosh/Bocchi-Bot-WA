async function f(a, b, eng) {
    await b.sendText(a.from, `F`)
}

const helpobj = {
    'permission': 'foruser',
}
module.exports = {
    f,
    helpobj
}