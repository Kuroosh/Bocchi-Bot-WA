async function upfile2(a, b, eng) {
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
    const path2 = './commands/' + ordner + '/' + datei + '.js';
    var upfile2 = `async function ${datei}(a, b, eng) {\n`
    for (let i = 2; i < a.args.length; i++) {
        upfile2 += a.args[i] + " "
    }
    upfile2 += `
}
const helpobj = {
'command': \`${datei}\`,
'categorie': '',
'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
'usage': \`${datei}\`,
'description': '.'
};

module.exports = {
${datei},
helpobj
};
//  \`_${a.sender.id}_\` 
`
    updateFile(path2, upfile2)


}
const helpobj = {
    'command': `upfile2`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `upfile2 _order datei CODE_`,
    'permission': 'upfile2',
    'description': 'Fügt Code hinzu aber mit absicherung async-function!\n_Also Kein 1zu1_'
};

module.exports = {
    upfile2,
    helpobj
}