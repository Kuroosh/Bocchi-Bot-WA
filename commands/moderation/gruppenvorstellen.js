const { decryptMedia } = require('@open-wa/wa-automate')
const mime = require('mime-types');
const fs = require('fs-extra');

async function groupvorstellen(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isTeam = await getRang('isTeam', a.sender.id, a.db)
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (a.ar[0] == 'add') {
        if (!a.isGroupAdmins && !isTeam) return await b.reply(a.from, eng.adminOnly(), a.id)
        try {
            var vorstellenalter = a.args[2]
            if (isNaN(vorstellenalter) == true) return await b.reply(a.from, `Bitte verwende ${a.prefix}gvt add Name Alter Ort\n\n${vorstellenalter} ist keine Zahl`, a.id)
            if (a.quotedMsg) {
                var vorstellennr = a.quotedMsgObj.sender.id
                if (a.quotedMsg.isMedia) {
                    if (a.isQuotedImage) {
                        var vorstellenImg = await decryptMedia(a.quotedMsgObj);
                        var buf = new Buffer(vorstellenImg, 'base64');
                        fs.writeFileSync(`../media/gvtprofile/profilePic-${a.quotedMsgObj.sender.id}_${a.from}.png`, buf);
                        await a.db.addNoCatch('groupvorstellen', { groupid: a.from, id: vorstellennr, 'name': a.args[1], 'age': vorstellenalter, 'bundesland': a.args[3], 'bild': 'Bild vorhanden', 'vtaddedby': a.sender.id })
                        await b.sendTextWithMentions(a.from, `@${vorstellennr.replace('@c.us', '')} Absofort bist du bei uns hinterlegt mit folgenden Daten:\nName: ${a.args[1]}\nAlter: ${vorstellenalter}\nBundesland/Stadt: ${a.args[3]}\nund dem markierten Bild!\n\n*Deine Daten siehst du mit "${a.prefix}vt"*\n\n_Wenn du nicht einverstanden bist, schreibe bitte ${a.prefix}vt delete_`)
                    } else {
                        await a.db.addNoCatch('groupvorstellen', { groupid: a.from, id: vorstellennr, 'name': a.args[1], 'age': vorstellenalter, 'bundesland': a.args[3], 'bild': 'Kein Bild', 'vtaddedby': a.sender.id })
                        await b.sendTextWithMentions(a.from, `@${vorstellennr.replace('@c.us', '')} Absofort bist du bei uns hinterlegt mit folgenden Daten:\nName: ${a.args[1]}\nAlter: ${vorstellenalter}\nBundesland/Stadt: ${a.args[3]}\nAber keinem Bild!\n\n*Deine Daten siehst du mit "${a.prefix}vt"*\n\n_Wenn du nicht einverstanden bist, schreibe bitte ${a.prefix}vt delete_`)
                    }
                } else {
                    await a.db.addNoCatch('groupvorstellen', { groupid: a.from, id: vorstellennr, 'name': a.args[1], 'age': vorstellenalter, 'bundesland': a.args[3], 'bild': 'Kein Bild', 'vtaddedby': a.sender.id })
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
            var vtpingdb = a.isGroupMsg ? await a.db.getWhereWhere('groupvorstellen', 'groupid', 'id', { 'spalte1': a.from, 'spalte2': vtping[i].id }) : false
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
            const vtpingdb = a.isGroupMsg ? await a.db.getWhereWhere('groupvorstellen', 'groupid', 'id', { 'spalte1': a.from, 'spalte2': vtping[i].id }) : false
            if (!vtpingdb) {

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
        const vorstellen = a.isGroupMsg ? await a.db.getWhereWhere('groupvorstellen', 'groupid', 'id', { 'spalte1': a.from, 'spalte2': vorstellenupgradeid }) : false
        try {
            if (!vorstellen) {
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
                    await a.db.updategvtvorstellen(a.sender.id, neuesalter)
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
        const vorstellen = await a.db.getId('groupvorstellen', vorstellendeleteid)
        if (vorstellen.name == 'undefined' || vorstellen.name == undefined) {
            await b.reply(a.from, `Du bist nicht gespeichert im System der Vorstellung.`, a.id)
        } else {
            try {
                await a.db.removeId('groupvorstellen', vorstellendeleteid)
                a.fs.unlink(`../media/gvtprofile/profilePic-${vorstellendeleteid}_${a.from}.png`);
                await b.reply(a.from, `Erfolgreich Name, Alter und Ort/Bundesland und Bild gelöscht!`, a.id)
            } catch (err) {
                await b.sendText(a.from, `Error ${err}`)
            }
        }
    } else if (a.args[0] == 'help') {
        if (!isTeam) {
            await b.sendText(a.from, `\`\`\`Erklärung GVT-System\`\`\`\n*0. ${a.prefix}gvt*\nStellt euch vor.\n*1. ${a.prefix}gvt add Name Alter Bundesland*\nFügt *markierte* Person ins VT-System hinzu.\n*_Ausführung nur als Admin möglich_*\n*2. ${a.prefix}gvt ping*\nMarkiert alle Leute die nicht eingetragen sind.\n*_Ausführung nur als Admin möglich_*\n*3. ${a.prefix}gvt regping*\nMarkiert alle Leute die eingetragen sind.\n*_Ausführung nur als Admin möglich_*\n*4. ${a.prefix}gvt upgrade*\nErhöht dein Alter um eins!\n*5. ${a.prefix}gvt delete*\nLöscht deinen Eintrag aus der Datenbank!`)
        } else {
            await b.sendText(a.from, `\`\`\`Erklärung GVT-System\`\`\`\n*0. ${a.prefix}gvt || ${a.prefix}gvt Nummer*\nStellt euch vor bzw. die Person.\n*1. ${a.prefix}gvt add Name Alter Bundesland*\nFügt *markierte* Person ins VT-System hinzu.\n*_Ausführung nur als Admin möglich_*\n*2. ${a.prefix}gvt ping*\nMarkiert alle Leute die nicht eingetragen sind.\n*_Ausführung nur als Admin möglich_*\n*3. ${a.prefix}gvt regping*\nMarkiert alle Leute die eingetragen sind.\n*_Ausführung nur als Admin möglich_*\n*4. ${a.prefix}gvt upgrade*\nErhöht dein Alter um eins!\n*5. ${a.prefix}gvt delete*\nLöscht deinen Eintrag aus der Datenbank!\n*5.1 ${a.prefix}gvt delete Nummer*\nLöscht den Eintrag aus der Datenbank!`)
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
        const vorstellen = a.isGroupMsg ? await a.db.getWhereWhere('groupvorstellen', 'groupid', 'id', { 'spalte1': a.from, 'spalte2': vorstellenid }) : false
        if (!vorstellen) {
            await b.reply(a.from, `Du bist nicht gespeichert im System der Vorstellung.`, a.id)
        } else {

            try {
                var watermark = require('jimp-watermark');
                var options = {
                    'ratio': 1,// Should be less than one
                    'opacity': 0.3, //Should be less than one
                    'dstPath': `../media/gvtprofile/wasser-${vorstellenid}_${a.from}.png`
                };
                watermark.addWatermark(`../media/gvtprofile/profilePic-${vorstellenid}_${a.from}.png`, '/home/whatsapp/media/logo.png', options).then(async () => {
                    await a.sleep(500)
                    await b.sendImage(a.from, `../media/gvtprofile/wasser-${vorstellenid}_${a.from}.png`, "bild.png", `Deine gespeicherten Daten!\nName: ${vorstellen.name}\nAlter: ${vorstellen.age}\nBundesland: ${vorstellen.bundesland}\n\n\`\`\`Wenn das alter falsch ist Probier ${a.prefix}vt upgrade\`\`\``, a.id).then(async () => {
                        await a.sleep(200)
                        a.fs.unlink(`../media/gvtprofile/wasser-${vorstellenid}_${a.from}.png`);
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
    'command': `gruppenvorstellen`,
    'categorie': 'Moderation',
    'alias': ['gvt'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `gvt help`,
    'permission': 'foruser',
    'description': 'Sendet Infos Wie das vollständige GruppenVorstellSystem funktioniert'
};

module.exports = {
    groupvorstellen,
    gvt: groupvorstellen,
    helpobj
}