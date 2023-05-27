async function menü(a, b, eng) {
    try {
        const path = require('path');
        async function getAsyncFunctionNames(dirPath) {
            try {
                const files = await a.fs.readdir(dirPath);
                const asyncFuncNames = [];
                for (const file of files) {
                    const filePath = `${dirPath}/${file}`
                    const fileStat = await a.fs.stat(filePath);

                    if (fileStat.isDirectory()) {
                        const subDirFuncNames = await getAsyncFunctionNames(filePath);
                        asyncFuncNames.push(...subDirFuncNames);
                    } else if (file.endsWith('.js')) {
                        const module = await import(filePath);
                        const fileFuncNames = Object.keys(module).filter(key => {
                            const func = module[key];
                            return typeof func === 'function' && func.constructor.name === 'AsyncFunction';
                        });

                        if (fileFuncNames.length > 0) {
                            const fileNameWithoutExt = file.replace('.js', '');

                            asyncFuncNames.push({
                                fileName: fileNameWithoutExt,
                                funcNames: fileFuncNames.filter(name => name !== fileNameWithoutExt),
                            });
                        }
                    }
                }

                return asyncFuncNames.sort((a, b) => a.fileName.localeCompare(b.fileName));
            } catch (error) {
                console.error(error);
            }
        }

        async function getSortedFolderNames(directory) {
            const folders = a.fs.readdirSync(directory, { withFileTypes: true })
                .filter(dirent => dirent.isDirectory())
                .map(dirent => dirent.name);

            folders.sort();
            return folders
        }

        const menuList = a.fs.readdirSync('./commands').join('\n')
        var commandName = a.args[0]?.toLowerCase()
        var commandName = a.args[0]?.toLowerCase()
        if (commandName == '1') {
            commandName = 'bot'
        } else if (commandName == '2') {
            commandName = 'downloader'
        } else if (commandName == '3') {
            commandName = 'fun'
        } else if (commandName == '4') {
            commandName = 'gaming'
        } else if (commandName == '5') {
            commandName = 'leveling'
        } else if (commandName == '6') {
            commandName = 'moderation'
        } else if (commandName == '7') {
            commandName = 'sticker'
        } else if (commandName == '8') {
            commandName = 'team'
        }

        if (!menuList.includes(commandName)) {
            const RegisterUser = await a.db.count('registered')
            const CommandAll = await a.db.count('log2')
            var commandall2 = CommandAll + 3077538
            const teamcheckdb = await a.db.getId('team', a.sender.id)
            if (teamcheckdb) {
                teamrang = teamcheckdb.typ
            } else {
                teamrang = 'User'
            }
            const level = await a.level.getLevelingLevel(a.sender.id)
            const isPremium = await a.db.containsId('premium', a.sender.id)
            const registered = await a.db.getId('registered', a.sender.id)

            var tepp2 = ''
            var tepp = await getSortedFolderNames('./commands');
            for (let i = 0; i < tepp.length; i++) {
                tepp2 += `\`\`\`[${i + 1}]\`\`\` _*${tepp[i]?.toUpperCase()}*_\n`
            }
            const time = a.moment.tz('Europe/Berlin').format('HH')
            if (time >= 06) {
                res = "\`\`\`     🪥Guten Morgen🪥\`\`\`"
            }
            if (time >= 10) {
                res = "\`\`\`    ☕Guten Vormittag☕\`\`\`"
            }
            if (time >= 12) {
                res = "\`\`\`      🍔Guten Mittag🍔\`\`\`"
            }
            if (time >= 14) {
                res = "\`\`\`    🍰Guten Nachmittag🍰\`\`\`"
            }
            if (time >= 17) {
                res = "\`\`\`      🌆Guten Abend🌆\`\`\`"
            }
            if (time >= 21 || (time >= 00 && time < 06)) {
                res = "\`\`\`      🌙Gute Nacht🌙\`\`\`"
            }
            await b.sendText(a.from, eng.menunew(res, tepp2, a.username, RegisterUser, teamrang, level, isPremium ? 'Yes' : 'No', commandall2))

        } else {
            var commandMenu = `─═≡≡───── *${commandName?.toUpperCase()}* ──────≡≡═─\n\n`
            const asyncFunctionNames = await getAsyncFunctionNames('/home/whatsapp/BocchiBot-Haupt/commands/' + commandName);

            for (let i = 0; i < asyncFunctionNames.length; i++) {
                const fileName = asyncFunctionNames[i].fileName.charAt(0).toUpperCase() + asyncFunctionNames[i].fileName.slice(1);
                let functionList = `\`\`\`${i + 1}.\`\`\` ${fileName}`;

                if (asyncFunctionNames[i].funcNames.length > 0) {
                    functionList += '\n';
                }

                asyncFunctionNames[i].funcNames.forEach((name, index) => {
                    functionList += ` 🔹 ${name.charAt(0).toUpperCase() + name.slice(1)}`;

                    if (index < asyncFunctionNames[i].funcNames.length - 1) {
                        functionList += '\n';
                    }
                });

                commandMenu += `${functionList}\n`;
            }

            await b.sendText(a.from, commandMenu.trimEnd());
        }
    } catch (e) {
        console.error(e);
    }
}
const helpobj = {
    'command': `menü`,
    'categorie': 'Bot',
    'alias': ['menu'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `menü _zahldesmenüs_`,
    'permission': 'foruser',
    'description': 'Sendet das gewünschte Menü.'
};

module.exports = {
    menü,
    menu: menü,
    helpobj
}



