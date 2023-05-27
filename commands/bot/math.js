async function math(a, b, eng) {
    const mathjs = require('mathjs')
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.q) return await b.reply(a.from, eng.wrongFormat(), a.id)
    if (typeof mathjs.evaluate(a.q) !== 'number') {
    } else {
        await b.reply(a.from, `*── 「 MATH 」 ──*\n\n${a.q} = ${mathjs.evaluate(a.q)} `, a.id)
    }
}
const helpobj = {
    'command': `math`,
    'categorie': 'Bot',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `math _deine rechnung_`,
    'permission': 'foruser',
    'description': 'Rechnet sonst wie schwierige Rechnungen.'
};

module.exports = {
    math,
    helpobj
}
