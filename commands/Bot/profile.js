async function profile(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isTeam = await getRang('isTeam', a.sender.id, a.db)
    var mydata = a.sender.id
    if (a.quotedMsg) {
        mydata = a.quotedMsg.sender.id
    } else if (a.q) {
        if (!isTeam) return await b.reply(a.from, eng.teamOnly(), a.id)
        mydata = a.q.replace(/^0+/, '49').replace(/\D/g, '') + '@c.us'
    }
    const username = await a.db.getId('registered', mydata)
    if (username.name == undefined) return await b.sendText(a.from, `Dieser Nutzer ist nicht Registriert.`)
    const profilePic = await b.getProfilePicFromServer(mydata)
    var commands = await a.db.countWhere('log2', { 'userid': mydata })
    const benet = (await a.db.containsId('banned', mydata)) ? '*Yes*' : '*No*'
    const adm = a.groupAdmins.includes(mydata) ? '*Yes*' : '*No*'
    const premi = (await a.premium.checkPremiumUser(mydata)) ? '*Yes*' : '*No*'
    const levelMe = await a.level.getLevelingLevel(mydata)
    const xpMe = await a.level.getLevelingXp(mydata)
    const req = 5 * Math.pow(levelMe, 2) + 50 * 1 + 100
    const profile = await a.db.getFromAllWithWhere('team', { 'id': mydata })
    var rang;
    var isTeam2 = await getRang('isTeam', mydata, a.db)
    if (isTeam2) {
        if (profile[0].typ == 'Support') {
            rang = '*Supporter/in*'
        } else if (profile[0].typ == 'Mod') {
            rang = '*Moderator/in*'
        } else if (profile[0].typ == 'Manager') {
            rang = '*Manager/in*'
        } else if (profile[0].typ == 'StvInhaber') {
            rang = '*Stellvertrende/r Inhaber/in*'
        } else if (profile[0].typ == 'Developer') {
            rang = '*Developer/in*'
        } else if (profile[0].typ == 'Inhaber') {
            rang = '*Inhaber/in*'
        } else if (profile[0].typ == 'Hoster') {
            rang = '*Hoster/in*'
        } else if (profile[0].typ == 'TopSpender') {
            rang = '*TopSpender*'
        } else if (profile[0].typ == 'Ookami') {
            rang = '*口Ｋ丹爪工*'
        } else if (profile[0].typ == 'Secret') {
            rang = '*Limit29*'
        }
    } else {
        rang = '*User*'
    }
    const average = await a.db.getSelfRatingAverage(mydata);
    const count = await a.db.getRatingCountForUser(mydata);
    let message3 = ''
    for (let i = 0; i < Math.floor(average); i++) {
        message3 += '⭐';
    }
    if (average - Math.floor(average) >= 0.5) {
        message3 += '✨';
    }
    if (average == '5') {
        for (let i = 0; i < Math.floor(average); i++) {
            message3 = '🌟🌟🌟🌟🌟';
        }
    }
    let message2 = `${count > 0 ? `${message3}` : 'Du hast noch keine Bewertungen erhalten.'}`;
    if (profilePic == `ERROR: 401` || profilePic == `ERROR: 404` || profilePic == `ERROR: 400`) { //done
        var pfp = a.errorImg
    } else {
        pfp = profilePic
    }
    try {
        await b.sendFileFromUrl(a.from, pfp, `${username.name}.jpg`, eng.profile(username.name, "", premi, benet, adm, levelMe, req, xpMe, rang, commands, message2), a.id)
    } catch (err) {
        await b.reply(a.from, eng.profile(username.name, "", premi, benet, adm, levelMe, req, xpMe, rang, commands, message2), a.id)
    }
}
const helpobj = {
    'command': `profile`,
    'categorie': 'Bot',
    'alias': ['me', 'profil'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `profile`,
    'permission': 'foruser',
    'description': 'Sendet Infos über dich'
};
module.exports = {
    profile,
    me: profile,
    profil: profile,
    helpobj
}