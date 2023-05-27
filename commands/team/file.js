async function file(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)
    if (!isLeitung) return await b.reply(a.from, eng.modOnly(), a.id)
    async function sendFileAsMessage(filePath) {
        // Lesen des Dateiinhalts
        const fileContent = await a.fs.promises.readFile(filePath, 'utf-8');

        // Senden der Textnachricht mit dem Dateiinhalt
        await b.sendText(a.from, fileContent);
    }

    if (!a.args[1]) return await b.sendText(a.from, `Du musst erst einen Ordner angeben und danach den Dateiname\n\nBeispiel:${prefix}file team password`)
    var ordner = a.args[0].toLowerCase()
    var datei = a.args[1].toLowerCase()
    const filePath = './commands/' + ordner + '/' + datei + '.js';

    await sendFileAsMessage(filePath);
}
const helpobj = {
    'command': `file`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `file _ordner datei-name_`,
    'permission': 'file',
    'description': 'Gibt den Inhalt einer Datei aus.'
};

module.exports = {
    file,
    helpobj
} 