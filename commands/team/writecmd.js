async function writecmd(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isInhaber = await getRang('Inhaber', a.sender.id, a.db)
    if (!isInhaber) return await b.reply(a.from, eng.inhaberOnly(), a.id)
    const path = require('path')

    async function createFileWithCode(filepath, code) {
        return new Promise((resolve, reject) => {
            a.fs.writeFile(filepath, code, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
    async function findFileInCommands(fileName) {
        const rootDir = './commands';
        const fileExists = await checkFileExistsRecursive(fileName, rootDir);
        var filecommand;
        if (fileExists == null) {
            filecommand = 'false'
        } else {
            filecommand = 'true'
        }
        return filecommand;
    }
    async function findFileInCommands2(fileName) {
        const rootDir = './commands';
        const fileExists = await checkFileExistsRecursive(fileName, rootDir);
        const message = fileExists ? `Datei gefunden in:\n${fileExists}` : `Die Datei *${fileName}* konnte nicht gefunden werden`;
        return message;
    }

    async function checkFileExistsRecursive(fileName, currentDir) {
        const files = await a.fs.promises.readdir(currentDir);
        for (const file of files) {
            const filePath = path.join(currentDir, file);
            const stats = await a.fs.promises.stat(filePath);
            if (stats.isDirectory()) {
                const result = await checkFileExistsRecursive(fileName, filePath);
                if (result) {
                    return result;
                }
            } else if (file === fileName) {
                return filePath;
            }
        }
        return null;
    }

    var writecmdcmd = a.args[0].toLowerCase()
    var wcexist = await findFileInCommands(writecmdcmd + '.js')
    var wcecist2 = await findFileInCommands2(writecmdcmd + '.js')
    if (wcexist == true || wcexist == 'true') {
        await b.sendText(a.from, `${wcecist2}`)
    } else {
        const filepath = './commands/allcmds/' + writecmdcmd + '.js';
        var writecmd = `async function ${writecmdcmd}(a, b, eng) {\n`
        for (let i = 1; i < a.args.length; i++) {
            writecmd += a.args[i] + " "
        }
        writecmd += `
}
const helpobj = {
'command': \`${writecmdcmd}\`,
'categorie': '',
'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
'usage': \`${writecmdcmd}\`,
'description': '.'
};

module.exports = {
${writecmdcmd},
helpobj
};
//  \`_${a.sender.id}_\` 
        `
        try {
            await createFileWithCode(filepath, writecmd);
            await b.sendText(a.from, `Datei *${writecmdcmd}* erfolgreich erstellt mit folgenden code:\n\n${writecmd}`);
        } catch (err) {
            await b.sendText(a.from, `Fehler beim Erstellen der Datei ${filepath}: ${err}`);
        }
    }


}
const helpobj = {
    'command': `writecmd`,
    'categorie': 'Team',
    'alias': ['wc'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `writecmd _dateiname CODE_`,
    'permission': 'writecmd',
    'description': 'Erstelle eine Datei mit Code.\nDie Datei ist automatisch in\ncommands/allcmds/${deindateiname}_deine-nummer_.js.'
};

module.exports = {
    writecmd,
    wc: writecmd,
    helpobj
}