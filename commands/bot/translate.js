async function translate(a, b, eng) {
    const translate = require('@vitalets/google-translate-api')
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)

    if (!a.q.includes('/')) return await b.reply(a.from, eng.wrongFormat(), a.id)
    const texto = a.q.substring(0, a.q.indexOf('/') - 1)
    const languaget = a.q.substring(a.q.lastIndexOf('/') + 2)
    translate(texto, { to: languaget }).then(res => { b.reply(a.from, res.text, a.id) })


}
const helpobj = {
    'command': `translate`,
    'categorie': 'Bot',
    'alias': ['trans'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `translate _text / sprach-code_`,
    'permission': 'foruser',
    'description': 'Übersetzt den angegebenen Text in die Sprache des Sprach-Codes.'
};

module.exports = {
    translate,
    trans: translate,
    helpobj
}
