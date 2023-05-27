async function pm2(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isTeam = await getRang('isTeam', a.sender.id, a.db)
    if (!isTeam) return await b.reply(a.from, eng.teamOnly(), a.id)

    if (!isTeam) return await b.reply(a.from, eng.teamOnly(), a.id)
    const exec = require('await-exec')
    const pm2 = require('pm2')

    var hosts = await a.db.getOnline()
    var hostserror = await a.db.getError()
    var host = a.args[1]


    if (a.isMe) {

        if (a.ar[0] == 'restart') {
            if (host == undefined) return await b.reply(a.from, `Nenne mir bitte die entsprechende SessionID damit ich dir helfen kann.\n\n_Beachte die Groß und Kleinschreibung!!_`, a.id)
            try {
                pm2.restart(host)
                b.sendText(a.from, `"${host} wird neugestartet, bitte warten."`)
            } catch (e) {
                await b.sendText(a.from, `Ich konnte keine SessionID mit dem Namen ${host} finden.\nInformiere dich bitte unter *${a.prefix}pm3 check* welche SessionId's verfügbar sind.`);
            }
        } else if (a.ar[0] == 'restartall') {
            await b.sendText(a.from, `Alle SessionIDs wurden neugestartet, außer "${a.sessionId}".\n"${a.sessionId}" wird als letztes neugestartet.`)
            try {
                // Get a list of all PM2 processes
                const processList = await new Promise((resolve, reject) => {
                    pm2.list((err, processList) => {
                        if (err) reject(err);
                        else resolve(processList);
                    });
                });
                // Restart all processes except the one with the specified ID
                var restartHosts = processList.filter(process => process.pm_id != host).map(process => process.name);
                await Promise.all(restartHosts.map(async (h) => {
                    await exec(`pm2 restart ${h}`);
                }));
                // Restart the process with the specified ID
                pm2.restart(processList.find(process => process.pm_id == host).name);
                await b.sendText(a.from, `"${host}" wird neugestartet, bitte warten."`);
            } catch (e) {
                await b.sendText(a.from, `Ich konnte nichts neustarten weil folgender Fehler aufgetreten ist:\n\n` + e);
            }

        } else if (a.ar[0] == 'delete') {
            if (a.args[1] == undefined) return await b.reply(a.from, `Nenne mir bitte die entsprechende SessionID damit ich dir helfen kann.\n\n_Beachte die Groß und Kleinschreibung!!_`, a.id)
            pm2.delete(host)
            await a.db.removeId('hosts', host)
            await a.db.removeId('isBocchiBot', host)


            /*
        a.fs.unlink('../Sessions/' + host + '.data.json', async function (err) {
            pm2.delete(host)
            if (err) return await b.sendText(a.from, `Ich konnte keine gespeicherte Sitzung mit dem Namen ${host} finden.`);
 
            await exec(`rm -rf ../Sessions/_IGNORE_${host}`).then(async () => {
                await a.db.removeId('hosts', host)
                await a.db.removeId('isBocchiBot', host)
            })
            */
            await b.reply(a.from, `*── 「 HOSTS 」 ──*\n❌SessionId: ${host}\nWurde aus der Hosts entfernt, Session bleibt erhalten bis *${a.prefix}pm3 reset ${host}* ausgeführt wird.`, a.id)
            //}

        } else if (a.ar[0] == 'stop') {
            if (a.args[1] == undefined) return await b.reply(a.from, `Nenne mir bitte die entsprechende SessionID damit ich dir helfen kann.\n\n_Beachte die Groß und Kleinschreibung!!_`, a.id)
            pm2.stop(host)
            await b.reply(a.from, `*── 「 HOSTS 」 ──*\n❌Folgende SessionId ist nun offline\nSessionId: ${host}`, a.id)


        } else if (a.ar[0] == 'reset') {
            if (a.args[1] == undefined) return await b.reply(a.from, `Nenne mir bitte die entsprechende SessionID damit ich dir helfen kann.\n\n_Beachte die Groß und Kleinschreibung!!_`, a.id)
            a.fs.unlink('../Sessions/' + host + '.data.json', async function (err) {
                if (err) await b.sendText(a.from, `Diese SessionID ${host} ist nicht angemeldet gewesen und wird nun entfernt.`);
                pm2.delete(host)
                a.fs.rmSync(`../Sessions/_IGNORE_${host}`, { recursive: true, force: true })
                await a.db.removeId('hosts', host)
                await a.db.removeId('isBocchiBot', host)
                await a.sleep(2000)
                try {
                    await a.db.addNoCatch('hosts', { 'id': host })
                    //startet den Bot anschließend neu
                    pm2.start({
                        script: 'index.js',
                        name: `${host}`,
                        args: [`${host}`]
                    },
                        function (err, apps) {
                            if (err) {
                                console.error(err)
                                return pm2.disconnect()
                            }
                        })
                    await b.reply(a.from, `*── 「 HOSTS 」 ──*\nBot mit Id ${host} zurückgesetzt`, a.id).then(async () => {
                        await b.sendText(a.from, `In 20 Sekunden Kommt der Qr code für Die Session`)
                        await a.sleep(20000)
                        await b.sendFile(a.from, `./qrcodes/${host}.png`, `Hier ist der QR-Code für die SessionID ${host}`, `Hier ist der QR-Code für die SessionID ${host}`)
                    })
                } catch (e) {
                    await b.reply(a.from, `*── 「 HOSTS 」 ──*\nDiese SessionId gibt es bereits!❌`, a.id)
                }
            })

        } else if (a.ar[0] == 'start') {
            if (a.args[1] == undefined) return await b.reply(a.from, `Nenne mir bitte die entsprechende SessionID damit ich dir helfen kann.\n\n_Beachte die Groß und Kleinschreibung!!_`, a.id)
            try {
                await a.db.addNoCatch('hosts', { 'id': host })
                pm2.connect(function (err) {
                    if (err) {
                        console.error(err)
                        process.exit(2)
                    }
                    pm2.start({
                        script: 'index.js',
                        name: `${host}`,
                        args: [`${host}`]
                    },
                        function (err, apps) {
                            if (err) {
                                console.error(err)
                                return pm2.disconnect()
                            }
                        })
                })
                await b.sendText(a.from, 'In 10 Sekunden wird der letzte verfügbare QR-Code gesendet für deine SessionID')
                await a.sleep(10000)
                await b.sendFile(a.from, `./qrcodes/${host}.png`, `Hier ist der QR-Code für die SessionID ${host}`, `Hier ist der QR-Code für die SessionID ${host}`)
                //await b.reply(a.from, `*── 「 HOSTS 」 ──*\nSessionId *${host}* mit MD: *${hostsmdid}* wurde hinzugefügt✔\n\n_Denk an ${a.prefix}bocchi add wenn der bot Online ist(markiere den Bot!)_`, a.id).then(async () => {
                //    await b.sendText(a.from, `In 10 Sekunden Kommt der Qr code für Die Session`)
                //    await a.sleep(10000)
                //    await b.sendFile(a.from, `./qrcodes/${host}.png`, `Hier ist der QR-Code für die SessionID ${host}`, `Hier ist der QR-Code für die SessionID ${host}`)
                //})

            } catch (e) {
                //await b.reply(a.from, `*── 「 HOSTS 」 ──*\nDiese SessionId gibt es bereits!❌` + e, a.id)
                await b.reply(a.from, `*── 「 HOSTS 」 ──*\nDu kannst nur einen Bot starten der bereits existiert`)
            }
        } else if (a.ar[0] == 'check') {

            var text = `*── 「 HOSTS 」 ──*\n_sessionid - status: online/errorcheck_\n`
            for (var i = 0; i < hosts.length; i++) {
                for (var i = 0; i < hostserror.length; i++) {
                    var icon = ''
                    if (hosts[i].online == true || hosts[i].online == "true") {
                        icon = '✅️'
                    } else {
                        icon = '📴'
                    }
                    var icon2 = ''
                    if (hostserror[i].errorcheck == true || hostserror[i].errorcheck == "true") {
                        icon2 = '✅️'
                    } else {
                        icon2 = '❌'
                    }
                    text = text + `\`\`\`${i + 1}.\`\`\` *${hosts[i].id}* - _Status:_ ${icon}${icon2} \n`
                }
            }
            b.sendText(a.from, text)

        } else if (a.ar[0] == 'neu') {

            if (a.args[1] == undefined) return await b.reply(a.from, `Nenne mir bitte die entsprechende SessionID damit ich dir helfen kann.\n\n_Beachte die Groß und Kleinschreibung!!_`, a.id)
            try {
                const hostExist = hosts.find(h => h.id === host)
                if (hostExist) {
                    return await b.reply(a.from, `Die SessionId ${host} existiert bereits\nStarte Ihn bitte mit *${a.prefix}pm3 start ${host}*`, a.id)
                }
                await a.db.addNoCatch('hosts', { 'id': host })

                pm2.connect(function (err) {
                    if (err) {
                        console.error(err)
                        process.exit(2)
                    }
                    pm2.start({
                        script: 'index.js',
                        name: `${host}`,
                        args: [`${host}`]
                    },
                        function (err, apps) {
                            if (err) {
                                console.error(err)
                                return pm2.disconnect()
                            }
                        })
                })
                await b.sendText(a.from, 'In 20 Sekunden wird der letzte verfügbare QR-Code gesendet für deine SessionID')
                await a.sleep(20000)
                await b.sendFile(a.from, `./qrcodes/${host}.png`, `Hier ist der QR-Code für die SessionID ${host}`, `Hier ist der QR-Code für die SessionID ${host}`)
                //await b.reply(a.from, `*── 「 HOSTS 」 ──*\nSessionId *${host}* mit MD: *${hostsmdid}* wurde hinzugefügt✔\n\n_Denk an ${a.prefix}bocchi add wenn der bot Online ist(markiere den Bot!)_`, a.id).then(async () => {
                //    await b.sendText(a.from, `In 10 Sekunden Kommt der Qr code für Die Session`)
                //    await a.sleep(10000)
                //    await b.sendFile(a.from, `./qrcodes/${host}.png`, `Hier ist der QR-Code für die SessionID ${host}`, `Hier ist der QR-Code für die SessionID ${host}`)
                //})

            } catch (e) {
                //await b.reply(a.from, `*── 「 HOSTS 」 ──*\nDiese SessionId gibt es bereits!❌` + e, a.id)
                await b.reply(a.from, `*── 「 HOSTS 」 ──*\nDu kannst nur einen Bot starten der bereits existiert`)
            }

        } else {
            await b.sendText(a.from, `
    ── 「 PM3 」 ──
    
    Eine Erklärung zum Befehl */pm3* _später pm2_
                
    */pm3 delete* _SessionID_
    Ihr schickt hiermit einen Bot offline.
    Der Hosts eintrag wird entfernt, die Session bleibt erhalten (gescannter QR-Code).
    _enspricht /hosts remove SessionID_
    
    */pm3 stop* _SessionID_
    Stoppt die _SessionID_ ohne entfernung des Hosts eintrages.
    
    */pm3 start* _SessionID_
    Ihr schickt damit einen Bot wieder online, der Hosts eintrag wird hinzugefüt. Wenn nicht er online ist, wie gewohnt - */sendqr* _SessionID_
                
    */pm3 neu* _SessionID_
    Ihr möchtet einen neuen Bot online holen? Dies schickt anschließend auch den letzten genertierten QR-Code nach 20 Sekunden.
    */Bocchi add* nicht vergessen
    _enspricht /hosts add SessionID_
                
    */pm3 reset* _SessionID_
    Ihr habt probleme mit dem QR-code scannen? Löscht die vorherige Session(gescanner QR-Code), er startet anschließend neu und sendet einen QR nach 20 Sekunden.
    */Bocchi add* nicht vergessen
                
    */pm3 restart* _SessionID_
    Euer Bot reagiert nicht mehr? Startet ihn einmal neu. Wenn immer noch offline, ist dieser wohl abgemeldet oder vermutlich gebannt.
                
    */pm3 restartall*
    Du möchtest aus irgendeinem Grund alle Bots neustarten? Bitte schön.
    
    */pm3 check*
    Führt den Befehl */botcheck* aus
                
                
    ⁉️Warum das Ganze?⁉️
    Ehemalig lief ein großer Prozess der alle Bots laufen lässt. Dies führte bei /hosts remove dazu, das der ganze Bot neustarten muss.
    Teilweise sind einige Bots dann offline gewandert.
    Um das zu verhindern läuft nun jeder Bot Individuell und unabhängig von den anderen Bots.
    So Könnt Ihr nun Bots starten/stoppen/löschen oder auch zurücksetzen ohne die anderen Aktiven Bots zu schaden.
    `)
        }
    } else {
        //await b.sendText(a.from, 'Makiere einen Bot beim ausführen des Befehls.')
    }
}
const helpobj = {
    'command': `pm2`,
    'categorie': 'Team',
    'alias': ['pm3'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `pm2`,
    'permission': 'pm2',
    'description': 'Sendet eine Erklärung über PM2.'
};

module.exports = {
    pm2,
    pm3: pm2
}