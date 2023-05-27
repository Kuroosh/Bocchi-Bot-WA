async function premiumlist(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)
    const isRegistered = await a.db.containsId('registered', a.sender.id)

    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!isLeitung) return await b.reply(a.from, eng.leitungOnly(), a.id)
    let listPremi = '*── 「 PREMIUM USERS 」 ──*\n\n'
    var allPremiumUser = await a.premium.getAllPremiumUser()
    var premiumArray = []
    if (typeof allPremiumUser !== typeof undefined) {
        for (let i = 0; i < allPremiumUser.length; i++) {
            let user = allPremiumUser[i]
            let id = user.id
            let timeDB = new Date(user.expired + ' GMT+02:00');
            let time = a.ms((timeDB).getTime() - new Date().getTime())
            let contact = await b.getContact(id)
            if (contact == null) {
                contact = { 'pushname': '' }
            }
            premiumArray.push({ 'id': id, 'time': time, 'contact': contact })
        }
    }
    let sorted = premiumArray.sort(function (a, b) {
        if (a == null || b == null) {
            return -1
        }
        return a.time.days - b.time.days;
    });
    for (let i = 0; i < sorted.length; i++) {
        let checkExp = sorted[i]
        listPremi += `${i + 1}. `
        var premiumuser = await a.db.getId('registered', checkExp.id)
        if (typeof premiumuser !== typeof undefined) {
            listPremi += `*Name*: ${premiumuser.name}\n`
        } else {
            listPremi += `\n`
        }
        listPremi += `➸ wa.me/${checkExp.id.replace('@c.us', '')}\n➸ *Expired*: ${checkExp.time.days} day(s) ${checkExp.time.hours} hour(s) ${checkExp.time.minutes} minute(s)\n\n`
    }
    await b.reply(a.from, listPremi, a.id)


}
const helpobj = {
    'command': `premiumlist`,
    'categorie': 'Team',
    'alias': ['plist'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `premiumlist`,
    'permission': 'premiumlist',
    'description': 'Gib eine Liste aller Premium-Nutzer an.'
};

module.exports = {
    premiumlist,
    plist: premiumlist,
    helpobj
}
