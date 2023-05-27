const { decryptMedia } = require('@open-wa/wa-automate')
const mime = require('mime-types');
const fs = require('fs-extra');

async function vorstellen(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isTeam = await getRang('isTeam', a.sender.id, a.db)
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (a.ar[0] == 'add') {
        if (!a.isGroupAdmins && !isTeam) return await b.reply(a.from, eng.adminOnly(), a.id)
        try {
            var vorstellenalter = a.args[2]
            if (isNaN(vorstellenalter) == true) return await b.reply(a.from, `Bitte verwende ${a.prefix}vt add Name Alter Ort\n\n${vorstellenalter} ist keine Zahl`, a.id)
            if (a.quotedMsg) {
                var vorstellennr = a.quotedMsgObj.sender.id
                if (a.quotedMsg.isMedia) {
                    if (a.isQuotedImage) {
                        var vorstellenImg = await decryptMedia(a.quotedMsgObj);
                        var buf = new Buffer(vorstellenImg, 'base64');
                        fs.writeFileSync(`../media/profiles/profilePic-${a.quotedMsgObj.sender.id}.png`, buf);
                        await a.db.addNoCatch('vorstellen', { id: vorstellennr, 'name': a.args[1], 'age': vorstellenalter, 'bundesland': a.args[3], 'bild': 'Bild vorhanden', 'vtaddedby': a.sender.id })
                        await b.sendTextWithMentions(a.from, `@${vorstellennr.replace('@c.us', '')} Absofort bist du bei uns hinterlegt mit folgenden Daten:\nName: ${a.args[1]}\nAlter: ${vorstellenalter}\nBundesland/Stadt: ${a.args[3]}\nund dem markierten Bild!\n\n*Deine Daten siehst du mit "${a.prefix}vt"*\n\n_Wenn du nicht einverstanden bist, schreibe bitte ${a.prefix}vt delete_`)
                    } else {
                        await a.db.addNoCatch('vorstellen', { id: vorstellennr, 'name': a.args[1], 'age': vorstellenalter, 'bundesland': a.args[3], 'bild': 'Kein Bild', 'vtaddedby': a.sender.id })
                        await b.sendTextWithMentions(a.from, `@${vorstellennr.replace('@c.us', '')} Absofort bist du bei uns hinterlegt mit folgenden Daten:\nName: ${a.args[1]}\nAlter: ${vorstellenalter}\nBundesland/Stadt: ${a.args[3]}\nAber keinem Bild!\n\n*Deine Daten siehst du mit "${a.prefix}vt"*\n\n_Wenn du nicht einverstanden bist, schreibe bitte ${a.prefix}vt delete_`)
                    }
                } else {
                    await a.db.addNoCatch('vorstellen', { id: vorstellennr, 'name': a.args[1], 'age': vorstellenalter, 'bundesland': a.args[3], 'bild': 'Kein Bild', 'vtaddedby': a.sender.id })
                    await b.sendTextWithMentions(a.from, `@${vorstellennr.replace('@c.us', '')} Absofort bist du bei uns hinterlegt mit folgenden Daten:\nName: ${a.args[1]}\nAlter: ${vorstellenalter}\nBundesland/Stadt: ${a.args[3]}\nAber keinem Bild!\n\n*Deine Daten siehst du mit "${a.prefix}vt"*\n\n_Wenn du nicht einverstanden bist, schreibe bitte ${a.prefix}vt delete_`)
                }
            } else {
                await b.reply(a.from, `Du musst ein Person markieren!`, a.id)
            }
        } catch (err) {
            console.log('[ERROR]', err.message);
            await b.reply(a.from, `Person bereits hinzugefügt`, a.id)
        }
    } else if (a.ar[0] == 'ping') {
        if (!a.isGroupAdmins && !isTeam) return await b.reply(a.from, eng.adminOnly(), a.id)
        const vtping = await b.getGroupMembers(a.groupId)
        let txt = `╔══✪〘 *VORSTELLEN* 〙✪══╗\n\n\`\`\`Ihr seid noch nicht eingetragen im System der Vorstellung.\`\`\`\n_Ein Admin kann euch nach Vorstellung hinzufügen mit ${a.prefix}vt add *Name Alter Ort.*_\n\n`
        for (let i = 0; i < vtping.length; i++) {
            var vtpingdb = a.isGroupMsg ? await a.db.getId('vorstellen', vtping[i].id) : false
            const isBocchiBot = await a.db.containsNeu('isBocchiBot', { 'botnummer': vtping[i].id })
            if (isBocchiBot) {

            } else {
                if (!vtpingdb) {
                    txt += '╠➥'
                    txt += ` @${vtping[i].id.replace(/@c.us/g, '')}\n`
                } else {

                }
            }
        }

        txt += '╚══✪〘 *B O C C H I* 〙✪══╝'
        await b.sendTextWithMentions(a.from, txt)
    } else if (a.ar[0] == 'regping') {
        if (!a.isGroupAdmins && !isTeam) return await b.reply(a.from, eng.adminOnly(), a.id)
        const vtping = await b.getGroupMembers(a.groupId)
        let txt = `╔══✪〘 *VORGESTELLT* 〙✪══╗\n\n\`\`\`Diese Personen haben sich bereits Vorgestellt.\`\`\`\n\n`
        for (let i = 0; i < vtping.length; i++) {
            var vtpingdb = await a.db.getId('vorstellen', vtping[i].id)
            if (vtpingdb.name == 'undefined' || vtpingdb.name == undefined) {

            } else {
                txt += '╠➥'
                txt += `@${vtping[i].id.replace(/@c.us/g, '')}\n${vtpingdb.name}, ${vtpingdb.age} Jahre, ${vtpingdb.bild}\n\n`
            }
        }
        txt += `╚══✪〘 *B O C C H I* 〙✪══╝
_Ein Admin kann euch nach Vorstellung hinzufügen mit ${a.prefix}vt add *Name Alter Ort*_`
        await b.sendTextWithMentions(a.from, txt)
    } else if (a.ar[0] == 'upgrade') {
        var vorstellenupgradeid = a.sender.id
        const vorstellen = await a.db.getId('vorstellen', vorstellenupgradeid)
        try {
            if (vorstellen.name == 'undefined' || vorstellen.name == undefined) {
                await b.reply(a.from, `Du bist nicht gespeichert im System der Vorstellung.`, a.id)
            } else {
                cd = 25920000000
                timername = 'vtupgrade'
                const timervtupgrade = await a.db.teamContains2('timer', { 'id': a.sender.id, typ: timername })
                if (timervtupgrade !== undefined && cd - (Date.now() - timervtupgrade) > 0) {
                    const time = a.ms(cd - (Date.now() - timervtupgrade))
                    await b.reply(a.from, eng.daily(time), a.id)
                } else {
                    var neuesalter = Math.floor(parseInt(vorstellen.age) + 1)
                    await a.db.updatevorstellen(a.sender.id, neuesalter)
                    await b.reply(a.from, `Alter erfolgreich von ${vorstellen.age} geändert zu ${neuesalter}.`, a.id)
                    await a.db.removetimer('timer', { 'id': a.sender.id, 'typ': timername })
                    await a.daily.addLimit(timername, a.sender.id)
                }
            }
        } catch (err) {
            await b.sendText(a.from, `Error ${err}`)

        }
    } else if (a.ar[0] == 'delete') {
        var vorstellendeleteid;
        if (!a.ar[1]) {
            vorstellendeleteid = a.sender.id
        } else {
            if (!isTeam) return await b.reply(a.from, eng.teamOnly(), a.id)
            vorstellendeleteid = a.q.replace(/^0+/, '49').replace(/\D/g, '') + '@c.us'
        }
        const vorstellen = await a.db.getId('vorstellen', vorstellendeleteid)
        if (vorstellen.name == 'undefined' || vorstellen.name == undefined) {
            await b.reply(a.from, `Du bist nicht gespeichert im System der Vorstellung.`, a.id)
        } else {
            try {
                await a.db.removeId('vorstellen', vorstellendeleteid)
                a.fs.unlink(`../media/profiles/profilePic-${vorstellendeleteid}.png`);
                await b.reply(a.from, `Erfolgreich Name, Alter und Ort/Bundesland und Bild gelöscht!`, a.id)
            } catch (err) {
                await b.sendText(a.from, `Error ${err}`)
            }
        }
    } else if (a.ar[0] == 'hgall') {
        if (!a.isGroupAdmins && !isTeam) return await b.reply(a.from, eng.adminOnly(), a.id)
        try {
            async function hgvgCheck(tagName) {
                return (await a.db.containsNeu('hgvg', { 'vg': tagName }));
            }
            async function hgvgItem(tagName) {
                var g = await a.db.getNeu('hgvg', { 'vg': tagName })
                if (typeof g === typeof undefined) {
                    return "LEER";
                }
                return g.hg;
            }
            var txt = 'VT-CHECK\n\n'
            var txt2 = ''
            const members = await b.getGroupMembersId(a.groupId)
            let vthgall = [];
            var vt = await a.db.getFromAll('vorstellen')
            var vt2 = await a.db.getAll('vorstellen', 'id')
            for (let i = 0; i < members.length; i++) {
                const isEingetragen = a.isGroupMsg ? vt2.includes(members[i]) : false
                let icon = isEingetragen ? '✅️' : '❌';
                if (!isEingetragen) {
                } else {
                    const isGroupAdmins = a.isGroupMsg ? a.groupAdmins.includes(members[i]) : false
                    if (!isGroupAdmins) {
                        vthgall.push(members[i])
                        txt += `@${members[i].replace('@c.us', '')} ${icon}\n`
                    } else {
                    }
                }
                // filtered.push(members[i] + '\n')
            }
            b.sendTextWithMentions(a.from, txt + '\n\nwerden gekickt und in die hg gefügt').then(() => {
                for (let i = 0; i < vthgall.length; i++) {
                    var tempItem;
                    hgvgItem(a.from).then(function (res) {
                        tempItem = res
                        hgvgCheck(a.from).then(async function (res) {
                            if (res) {
                                try {
                                    try {
                                        await b.addParticipant(tempItem, vthgall[i])//.then(async function () {
                                    } catch (e) {

                                    }
                                    // await b.sendTextWithMentions(a.from, `Ok @${vthgall[i].replace('@c.us', '')} wird nun zur Hauptgruppe hinzugefügt!`)
                                    const vorstellen = await a.db.getId('vorstellen', vthgall[i])
                                    try {
                                        var watermark = require('jimp-watermark');
                                        var options = {
                                            'ratio': 1,// Should be less than one
                                            'opacity': 0.3, //Should be less than one
                                            'dstPath': `../media/profiles/wasser-${vthgall[i]}.png`
                                        };
                                        watermark.addWatermark(`../media/profiles/profilePic-${vthgall[i]}.png`, '/home/whatsapp/media/logo.png', options).then(async () => {
                                            await a.sleep(500)
                                            await b.sendImage(tempItem, `../media/profiles/wasser-${vthgall[i]}.png`, "bild.png", `Deine gespeicherten Daten!\nName: ${vorstellen.name}\nAlter: ${vorstellen.age}\nBundesland: ${vorstellen.bundesland}\n\n\`\`\`Wenn das alter falsch ist Probier ${a.prefix}vt upgrade\`\`\``, a.id).then(async () => {
                                                await a.sleep(200)
                                                a.fs.unlink(`../media/profiles/wasser-${vthgall[i]}.png`);

                                            })
                                        }).catch(async err => {
                                            //ohne bild :)
                                            console.log(err);
                                            await b.sendTextWithMentions(tempItem, `@${vthgall[i].replace('@c.us', '')}  Deine gespeicherten Daten!\nName: ${vorstellen.name}\nAlter: ${vorstellen.age}\nBundesland: ${vorstellen.bundesland}\n\n\`\`\`Wenn das alter falsch ist Probier ${a.prefix}vt upgrade\`\`\``, a.id)
                                            // await b.sendText(a.from, err + '')
                                        });
                                    } catch (err) {
                                        await b.sendTextWithMentions(tempItem, `@${vthgall[i].replace('@c.us', '')} Deine gespeicherten Daten!\nName: ${vorstellen.name}\nAlter: ${vorstellen.age}\nBundesland: ${vorstellen.bundesland}\n\n\`\`\`Wenn das alter falsch ist Probier ${a.prefix}vt upgrade\`\`\``, a.id)
                                        await b.sendText(a.from, err + '')
                                    }
                                    // await b.sendTextWithMentions(tempItem, `Bitte stelle dich erneut vor @${vthgall[i]}!\n\n\`\`\`Da du über /vt hgall hinzugefügt worden bist verwende einfach /vt_\`\`\``)
                                    // await b.sendText(a.from, `Kick`)
                                    await b.removeParticipant(a.from, vthgall[i])
                                    // })
                                } catch (err) {
                                    // await b.removeParticipant(a.from, vthgall[i])
                                    b.react(a.message.id, '❌')
                                    // b.sendTextWithMentions(a.from, `Der Benutzer hat das Einladen deaktiviert.\nBitte speichere den Bot ein @${vthgall[i].replace('@c.us', '')}`)
                                }
                            }
                        })
                    })
                }
            });
        } catch (e) {
            await b.sendText(a.from, e)
        }
    } else if (a.args[0] == 'help') {
        if (!isTeam) {
            await b.sendText(a.from, `\`\`\`Erklärung VT-System\`\`\`\n*0. ${a.prefix}vt*\nStellt euch vor.\n*1. ${a.prefix}vt add Name Alter Bundesland*\nFügt *markierte* Person ins VT-System hinzu.\n*_Ausführung nur als Admin möglich_*\n*2. ${a.prefix}vt ping*\nMarkiert alle Leute die nicht eingetragen sind.\n*_Ausführung nur als Admin möglich_*\n*3. ${a.prefix}vt regping*\nMarkiert alle Leute die eingetragen sind.\n*_Ausführung nur als Admin möglich_*\n*4. ${a.prefix}vt upgrade*\nErhöht dein Alter um eins!\n*5. ${a.prefix}vt delete*\nLöscht deinen Eintrag aus der Datenbank!\n*6. ${a.prefix}vt hgall*\nFügt alle eingetragenen Leute in die Hauptgruppe.\n*_Ausführung nur als Admin möglich_*`)
        } else {
            await b.sendText(a.from, `\`\`\`Erklärung VT-System\`\`\`\n*0. ${a.prefix}vt || ${a.prefix}vt Nummer*\nStellt euch vor bzw. die Person.\n*1. ${a.prefix}vt add Name Alter Bundesland*\nFügt *markierte* Person ins VT-System hinzu.\n*_Ausführung nur als Admin möglich_*\n*2. ${a.prefix}vt ping*\nMarkiert alle Leute die nicht eingetragen sind.\n*_Ausführung nur als Admin möglich_*\n*3. ${a.prefix}vt regping*\nMarkiert alle Leute die eingetragen sind.\n*_Ausführung nur als Admin möglich_*\n*4. ${a.prefix}vt upgrade*\nErhöht dein Alter um eins!\n*5. ${a.prefix}vt delete*\nLöscht deinen Eintrag aus der Datenbank!\n*5.1 ${a.prefix}vt delete Nummer*\nLöscht den Eintrag aus der Datenbank!\n*6. ${a.prefix}vt hgall*\nFügt alle eingetragenen Leute in die Hauptgruppe.\n*_Ausführung nur als Admin möglich_*`)
        }
    } else {
        var ppic = ''
        var vorstellenid;
        if (!a.ar[1]) {
            vorstellenid = a.sender.id
        } else {
            if (!isTeam) return await b.reply(a.from, eng.teamOnly(), a.id)
            vorstellenid = a.q.replace(/^0+/, '49').replace(/\D/g, '') + '@c.us'
        }
        const vorstellen = await a.db.getId('vorstellen', vorstellenid)
        if (vorstellen.name == 'undefined' || vorstellen.name == undefined) {
            await b.reply(a.from, `Du bist nicht gespeichert im System der Vorstellung.`, a.id)
        } else {
            try {
                var watermark = require('jimp-watermark');
                var options = {
                    'ratio': 1,// Should be less than one
                    'opacity': 0.3, //Should be less than one
                    'dstPath': `../media/profiles/wasser-${vorstellenid}.png`
                };
                watermark.addWatermark(`../media/profiles/profilePic-${vorstellenid}.png`, '/home/whatsapp/media/logo.png', options).then(async () => {
                    await a.sleep(500)
                    await b.sendImage(a.from, `../media/profiles/wasser-${vorstellenid}.png`, "bild.png", `Deine gespeicherten Daten!\nName: ${vorstellen.name}\nAlter: ${vorstellen.age}\nBundesland: ${vorstellen.bundesland}\n\n\`\`\`Wenn das alter falsch ist Probier ${a.prefix}vt upgrade\`\`\``, a.id).then(async () => {
                        await a.sleep(200)
                        a.fs.unlink(`../media/profiles/wasser-${vorstellenid}.png`);
                    })
                }).catch(async err => {
                    //ohne bild :)
                    console.log(err);
                    await b.reply(a.from, `Deine gespeicherten Daten!\nName: ${vorstellen.name}\nAlter: ${vorstellen.age}\nBundesland: ${vorstellen.bundesland}\n\n\`\`\`Wenn das alter falsch ist Probier ${a.prefix}vt upgrade\`\`\``, a.id)
                    // await b.sendText(a.from, err + '')
                });
            } catch (err) {
                await b.reply(a.from, `Deine gespeicherten Daten!\nName: ${vorstellen.name}\nAlter: ${vorstellen.age}\nBundesland: ${vorstellen.bundesland}\n\n\`\`\`Wenn das alter falsch ist Probier ${a.prefix}vt upgrade\`\`\``, a.id)
                await b.sendText(a.from, err + '')
            }
        }
    }
}

const helpobj = {
    'command': `vorstellen`,
    'categorie': 'Moderation',
    'alias': ['vt'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `vt help`,
    'permission': 'foruser',
    'description': 'Sendet Infos Wie das vollständige VorstellSystem funktioniert'
};

module.exports = {
    vorstellen,
    vt: vorstellen,
    helpobj
}