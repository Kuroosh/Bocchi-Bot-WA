async function ojoin(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isModerator = await getRang('isModerator', a.sender.id, a.db)
    if (!isModerator) return await b.reply(a.from, eng.modOnly(), a.id)

    const ojoingrpid = a.args[0]
    const gcInfo4 = await b.inviteInfo(ojoingrpid) //Gruppenbeschreibung
    const config = b.getConfig()
    var gcInfoGroupId = ''
    if (config.multiDevice == true || config.multiDevice == "true") {
        if (a.isMe) {
            if (gcInfo4.status == '401') return await b.reply(a.from, `Ich wurde aus der Gruppe gekickt und konnte deshalb nicht beitreten.`, a.id)
            if (gcInfo4.status == '406') return await b.reply(a.from, `Dieser Gruppenlink ist nicht Gültig!`, a.id)

            gcInfoGroupId = gcInfo4.groupMetadata.id
        }
    } else {
        gcInfoGroupId = gcInfo4.id
    }
    if (a.isMe) {
        try {
            await a.db.addGroupinfoMitWert('welcome', { 'id': gcInfoGroupId, 'wert': 0 })
            await a.db.addGroupinfoMitWert('kickfilter', { 'id': gcInfoGroupId, 'wert': 0 })
            await a.sleep(2500)
            await b.joinGroupViaLink(a.url)
            if (a.args[1] !== undefined) {
                var join = '\`\`\`Information des Teams\n'
                for (let i = 1; i < a.args.length; i++)
                    join += a.args[i] + " "
                join += `\`\`\``
            } else {
                join = ''
            }
            await a.sleep(1500)
            console.log(gcInfoGroupId)
            await b.sendText(gcInfoGroupId, `Hallo das Teammitglied ${a.sender.username} hat mich in die Gruppe geschickt. \n\nViel Spaß.\n\n_Information! Alle Gruppeneinstellungen sind wie vorher außer welcome und kickfilter siehe ${a.prefix}gi_\n\n${join}`)
            await b.react(a.message.id, '🆗')
            // const lastmsg = await b.getMyLastMessage(a.from)
            // console.log(lastmsg)
            // await b.sendText(a.from, `Lastmsg.id: ${ lastmsg.id }\n\nLastmsg.t: ${ lastmsg.t }\n\nLastmsg.from: ${ lastmsg.from }\n\nLastmsg.to: ${ lastmsg.to }`)
            // await b.react(lastmsg.id, '✅️')
            // await b.react(a.message.id, '✅️')
            // await b.react(a.quotedMsgObj.id, '✅️')

        } catch (e) {
            console.log(e)
        }
    }

}

const helpobj = {
    'command': `ojoin`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `ojoin _link und nachricht markieren_`,
    'permission': 'ojoin',
    'description': 'Lässt den markierten Bot der Gruppe joinen.'
};



module.exports = {
    ojoin,
    helpobj
}