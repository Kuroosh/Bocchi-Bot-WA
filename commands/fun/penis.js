async function penis(a, b, eng) {
    var rndlz = Math.floor(Math.random() * 14) + 1
    var rndl = ''
    var rndle = '='
    for (let i = 0; i < rndlz; i++)
        rndl = rndl + rndle
    await b.sendText(a.from, `Penis:\n\nB${rndl}D`)
}
const helpobj = {
    'permission': 'foruser',
};

module.exports = {
    penis,
    helpobj
}