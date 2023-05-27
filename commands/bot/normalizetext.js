async function normalizetext(a, b, eng) {
    if (!a.q) return await b.sendText(a.from, `Du musst schon etwas angeben was wir normalizen sollen.`)
    const { normalizeUnicodeText } = require("normalize-unicode-text");
    const txt = normalizeUnicodeText(a.q)
    console.log(a.q + '\n\n' + txt)
    await b.sendText(a.from, txt)
    console.log(txt)


}
const helpobj = {
    'command': `normalizetext`,
    'categorie': 'Bot',
    'alias': ['ntext'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `normalizetext _unicode-text_`,
    'permission': 'foruser',
    'description': 'Macht aus Unicode Text Normalen gut lesebaren Text.'
};

module.exports = {
    normalizetext,
    nt: normalizetext,
    ntext: normalizetext,
    helpobj
}
