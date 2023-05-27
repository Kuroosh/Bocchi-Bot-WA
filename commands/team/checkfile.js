async function checkfile(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)
    if (!isLeitung) return await b.reply(a.from, eng.leitungOnly(), a.id)
    const path = require('path')
    async function findFileInCommands(fileName) {
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
    var checkfile = a.args[0].toLowerCase()
    const fileName = checkfile + '.js';
    const result = await findFileInCommands(fileName);
    await b.sendText(a.from, result);
}
const helpobj = {
    'command': `checkfile`,
    'categorie': 'Team',
    'alias': ['cf'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `checkfile _dateiname_`,
    'permission': 'checkfile',
    'description': 'Gibt den Pfad einer Datei an.'
};

module.exports = {
    checkfile,
    cf: checkfile,
    helpobj
}
