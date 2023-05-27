async function level(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isTeam = await getRang('isTeam', a.sender.id, a.db)
    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    var mydata = a.sender.id
    if (a.quotedMsg) {
        if (!isTeam) return await b.reply(a.from, eng.teamOnly(), a.id)
        mydata = a.quotedMsg.sender.id
    } else if (a.q) {
        if (!isTeam) return await b.reply(a.from, eng.teamOnly(), a.id)
        mydata = a.q.replace(/^0+/, '49').replace(/\D/g, '') + '@c.us'
    }
    var isTeam2 = await getRang('isTeam', mydata, a.db)

    const registered = await a.db.getId('registered', mydata)
    const username = registered?.name
    const levelMe = await a.level.getLevelingLevel(mydata)
    const xpMe = await a.level.getLevelingXp(mydata)
    const userLevel = await a.level.getLevelingLevel(mydata)
    const fetchXp1 = 5 * Math.pow(userLevel, 2) + 50 * userLevel + 100
    var role2 = 'Copper V'
    if (userLevel >= 10) {
        role2 = 'Copper IV'
    } if (userLevel >= 20) {
        role2 = 'Copper III'
    } if (userLevel >= 30) {
        role2 = 'Copper II'
    } if (userLevel >= 40) {
        role2 = 'Copper I'
    } if (userLevel >= 50) {
        role2 = 'Silver V'
    } if (userLevel >= 60) {
        role2 = 'Silver IV'
    } if (userLevel >= 70) {
        role2 = 'Silver III'
    } if (userLevel >= 80) {
        role2 = 'Silver II'
    } if (userLevel >= 90) {
        role2 = 'Silver I'
    } if (userLevel >= 100) {
        role2 = 'Gold V'
    } if (userLevel >= 110) {
        role2 = 'Gold IV'
    } if (userLevel >= 120) {
        role2 = 'Gold III'
    } if (userLevel >= 130) {
        role2 = 'Gold II'
    } if (userLevel >= 140) {
        role2 = 'Gold I'
    } if (userLevel >= 150) {
        role2 = 'Platinum V'
    } if (userLevel >= 160) {
        role2 = 'Platinum IV'
    } if (userLevel >= 170) {
        role2 = 'Platinum III'
    } if (userLevel >= 180) {
        role2 = 'Platinum II'
    } if (userLevel >= 190) {
        role2 = 'Platinum I'
    } if (userLevel >= 200) {
        role2 = 'Exterminator V'
    } if (userLevel >= 210) {
        role2 = 'Exterminator IV'
    } if (userLevel >= 220) {
        role2 = 'Exterminator III'
    } if (userLevel >= 230) {
        role2 = 'Exterminator II'
    } if (userLevel >= 240) {
        role2 = 'Exterminator I'
    } if (userLevel >= 300) {
        role2 = 'Diamond III'
    } if (userLevel >= 350) {
        role2 = 'Diamond II'
    } if (userLevel >= 400) {
        role2 = 'Diamond I'
    } if (userLevel >= 420) {
        role2 = 'Happy 420'
    } if (userLevel >= 500) {
        role2 = 'Addicted User'
    } if (userLevel >= 600) {
        role2 = 'Immortal'
    } if (userLevel >= 666) {
        role2 = 'Teufel'
    } if (userLevel >= 700) {
        role2 = 'Allwissend'
    } if (userLevel >= 777) {
        role2 = 'Jackpot'
    } if (userLevel >= 800) {
        role2 = 'Chatter'
    } if (userLevel >= 900) {
        role2 = 'Smombie'
    } if (userLevel >= 1000) {
        role2 = 'BOSS'
    } if (isTeam2) {
        role2 = '🛡️ Bocchi Team 🛡️'
    }
    if (!isTeam) {
        cd = 300000
        timername = 'levelAbrufen'
        const timerXpQuoted = await a.db.teamContains2('timer', { 'id': a.sender.id, typ: timername })
        if (timerXpQuoted !== undefined && cd - (Date.now() - timerXpQuoted) > 0) {
            const time = a.ms(cd - (Date.now() - timerXpQuoted))
            await b.reply(a.from, eng.daily(time), a.id)
        } else {
            await b.reply(a.from, eng.xp(username, levelMe, role2, fetchXp1, xpMe), a.id)
        }
    } else {
        await b.reply(a.from, eng.xp(username, levelMe, role2, fetchXp1, xpMe), a.id)
    }
}
const helpobj = {
    'command': `level`,
    'categorie': 'Leveling',
    'alias': ['xp'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `level`,
    'permission': 'foruser',
    'description': 'Sendet deine Level und XP.'
};

module.exports = {
    level,
    xp: level,
    helpobj
}