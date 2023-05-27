async function help(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isTeam = await getRang('isTeam', a.sender.id, a.db)

    const path = require('path')
    async function findFileInCommands(fileName) {
        const rootDir = '/home/whatsapp/BocchiBot-Haupt/commands';
        const fileExists = await checkFileExistsRecursive(fileName, rootDir);
        const message = fileExists ? `${fileExists}` : `Die Datei *${fileName}* konnte nicht gefunden werden`;
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
try {
    var checkfile = a.args[0].toLowerCase()
    const fileName = checkfile + '.js';
    const helperCommand = await findFileInCommands(fileName);
    // Zugriff auf helpobj der password.js
    const helpobj = require(helperCommand).helpobj;
    if (helpobj.categorie == 'Team') {
        if (isTeam) {
            b.reply(a.from, eng.HelperCommand(helpobj.command, helpobj.categorie, helpobj.alias.join(', '), helpobj.usage, helpobj.description), a.id)
        } else {
            b.reply(a.from, 'Dies ist ein Befehl aus der Kategorie Team, diesen kannst du nur ausführen wenn du im Bocchi Team bist.', a.id)
        }
    }  else {
        b.reply(a.from, eng.HelperCommand(helpobj.command, helpobj.categorie, helpobj.alias.join(', '), helpobj.usage, helpobj.description), a.id)
    }
} catch(e) {
    await b.sendText(a.from, `Help für Befehl ${checkfile} nicht gefunden!`)
}
}
const helpobj = {
    'command': `help`,
    'categorie': 'Bot',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `help Befehl`,
    'permission': 'foruser',
    'description': 'Sendet über jeden Befehl eine Erklärung'
};

module.exports = {
    help,
    helpjs: help,
    helpobj
}

// async function help(a, b, eng, ch) {
//     var { getRang } = a.importFresh('../../lib/rang.js')
    
//     var isOwner = await getRang('isOwner', a.sender.id, a.db)
//     if (!isOwner) return await b.reply(a.from, eng.cmdNotFound(), a.id)
//     if (!a.q) return await b.sendText(a.from, 'Du musst schon sagen was du willst')
//     try {
//         newcmdloader = eval("ch." + a.q)
//         await b.sendText(a.from, newcmdloader())
//     } catch (e) {
//         let messages = [];

//         // Schleife durch alle Export-Funktionen in eng.js
//         for (const key in ch) {

//             if (Object.hasOwnProperty.call(ch, key)) {
//                 messages.push(key);
//             }
//         }
//         await b.sendText(a.from, `Befehl *${a.q}* nicht gefunden!\nBefehle im Help-Command:\n${messages.join('\n')}`)
//     }
// }
// module.exports = {
//     help
// }

