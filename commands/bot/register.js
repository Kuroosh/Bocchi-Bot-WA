
async function register(a, b, eng) {
    const { createSerial } = require('../../tools')
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    if (a.isGroupMsg) return await b.reply(a.from, `Du kannst dich nur im Privat Chat registrieren!`, a.id)
    if (a.ar[0] == 'update') {
        var register = ''
        for (let i = 1; i < a.args.length; i++)
            register += a.args[i] + " "
        const newname = register.substring(0, register.indexOf('/')).trim()
        const newage = register.substring(register.indexOf('/') + 1).trim()
        if (!a.q.includes(' / ')) return await b.reply(a.from, `Bitte update deine Registrierung  wie folgt:\n${a.prefix}register update Name / Alter\nBeispiel:\n ${a.prefix}register Vorname / 18\n\nSollte Dein Name Beleidigend sein oder Spam enthalten, erählst du einen BocchiBan!`, a.id) //Vorname ist nun der außergewöhnlichename
        if (newname.toLowerCase() === 'name') return await b.reply(a.from, `"Name" ist nicht zulässig, du darfst gerne einen Künstlernamen verwenden oder vergleichbares.`, a.id)
        if (!isNaN(newage) == false) return await b.reply(a.from, `Bitte Überprüfe deine Eingaben\nDein Alter kann nicht aus Buchstaben bestehen.`, a.id)
        if (Number(newage) >= 50) return await b.reply(a.from, eng.ageOld(), a.id) //Zu Alt
        const registerlist = await a.db.getFromAllWithWhere('registered', { id: a.sender.id });
        a.register.updateregister(a.sender.id, newname, newage, a.time, registerlist[0].serial)
        await a.db.add('registerhistory', { 'id': a.sender.id, 'registerzeitpunkt': a.timeDE, 'oldname': registerlist[0].name, 'newname': newname, 'oldage': registerlist[0].age, 'newage': newage })
        await b.sendText(a.from, `Deine registrierung wurde erfolgreich geändert.\nÜberprüfe es mit /mydata`)
    } else {
        if (isRegistered) return await b.reply(a.from, `Du bist bereits registriert!\nFalls du trotzdem ein Problem hast, schreib bitte *${a.prefix}support*`, a.id)
        if (!a.q.includes(' / ')) return await b.reply(a.from, `Bitte registriere dich wie folgt:\n${a.prefix}register Name / Alter\nBeispiel:\n ${a.prefix}register Vorname / 18\n\nSollte Dein Name Beleidigend sein oder Spam enthalten, erählst du einen BocchiBan!`, a.id) //Vorname ist nun der außergewöhnlichename
        const namaUser = a.q.substring(0, a.q.indexOf('/')).trim()
        const umurUser = a.q.substring(a.q.indexOf('/') + 1).trim()
        const serialUser = createSerial(20)
        if (namaUser === 'name') return await b.reply(a.from, `"Name" ist nicht zulässig, du darfst gerne einen Künstlernamen verwenden oder vergleichbares.`, a.id)
        if (!isNaN(umurUser) == false) return await b.reply(a.from, `Bitte Überprüfe deine Eingaben\nDein Alter kann nicht aus Buchstaben bestehen.`, a.id)
        if (Number(umurUser) >= 50) return await b.reply(a.from, eng.ageOld(), a.id) //Zu Alt

        a.register.addRegisteredUser(a.sender.id, namaUser, umurUser, a.time, serialUser)
        await b.reply(a.from, eng.registered(namaUser, umurUser, a.sender.id, a.time, serialUser), a.id)
        console.log(`\x1b[1m\x1b[32m[REGISTER]\x1b[35m [${a.sessionId}]\x1b[33m ${a.timeDE}\x1b[33m Name:\x1b[36m ${namaUser}\x1b[33m Alter:\x1b[36m ${umurUser}\x1b[33m Nummer:\x1b[36m  ${a.sender.id.replace('@c.us', '')}\x1b[33m Serial:\x1b[36m ${serialUser}`)
        await b.sendText('120363039259018408@g.us', `[REGISTER]\n*[${a.sessionId}]*\n\n*Name:* ${namaUser}\n*Alter:* ${umurUser}\n*Nummer:* wa.me/${a.sender.id.replace('@c.us', '')}`)
    }

}
const helpobj = {
    'command': `register`,
    'categorie': '',
    'alias': ['regist'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `register name / alter`,
    'permission': 'foruser',
    'description': 'Registriere dich bei uns.'
};

module.exports = {
    register,
    regist: register,
    helpobj
}
