async function upfile(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isOwner = await getRang('isOwner', a.sender.id, a.db)
    if (!isOwner) return await b.reply(a.from, eng.modOnly(), a.id)
    async function updateFile(lala, lale) {
        if (!a.fs.existsSync(lala)) {
            return await b.reply(a.from, 'Die Datei existiert nicht.', a.id);
        }
        const text = lale;
        a.fs.writeFile(lala, text, (err) => {
            if (err) {
                console.log(err);
                return b.reply(a.from, 'Fehler beim Aktualisieren der Datei.', a.id);
            }
            return b.reply(a.from, 'Datei erfolgreich aktualisiert.', a.id);
        });
    }
    var ordner = a.args[0].toLowerCase()
    var datei = a.args[1].toLowerCase()
    const path = './commands/' + ordner + '/' + datei + '.js';
    var upfile = ''
    for (let i = 2; i < a.args.length; i++) {
        upfile += a.args[i] + " "
    }
    updateFile(path, upfile)
}
const helpobj = {
    'command': `upfile`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `upfile _order datei CODE_`,
    'permission': 'upfile',
    'description': 'Fügt Code hinzu aber 1zu1!\n_ALSO VORSICHT_'
};

module.exports = {
    upfile,
    helpobj
}