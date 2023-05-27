async function credits(a, b, eng) {
    const dataJson1 = await a.db.getFromAllWithWhere('team', { 'typ': 'Inhaber' })
    const dataJson2 = await a.db.getFromAllWithWhere('team', { 'typ': 'StvInhaber' })
    const dataJson3 = await a.db.getFromAllWithWhere('team', { 'typ': 'Manager' })
    const dataJson4 = await a.db.getFromAllWithWhere('team', { 'typ': 'Mod' })
    const dataJson5 = await a.db.getFromAllWithWhere('team', { 'typ': 'Support' })
    let txt = '        -----[ CREDITS ]----- \n\n'
    txt += '        ______________ \n        *Inhaber/Developer/in:* \n\n'
    for (let i = 0; i < dataJson1.length; i++) {
        txt += '        -  ' + dataJson1[i].name + '\n'
    }
    txt += '        ______________ \n        *Stellvertretende Inhaber/in:* \n\n'
    for (let i = 0; i < dataJson2.length; i++) {
        txt += '        -  ' + dataJson2[i].name + '\n'
    }
    txt += '        ______________ \n        *Manager/in:* \n\n'
    for (let i = 0; i < dataJson3.length; i++) {
        txt += '        -  ' + dataJson3[i].name + '\n'
    }
    txt += '        ______________ \n        *Moderator/in:* \n\n'
    for (let i = 0; i < dataJson4.length; i++) {
        txt += '        -  ' + dataJson4[i].name + '\n'
    }
    txt += '        ______________ \n        *Supporter/in:* \n\n'
    for (let i = 0; i < dataJson5.length; i++) {
        txt += '        -  ' + dataJson5[i].name + '\n'
    }
    //     txt += '        ______________ \n        *Developer/in:* \n\n'
    // for (let i = 0; i < dataJson1.length; i++) {
    //     txt += '        -  ' + dataJson1[i].name + '\n'
    // }
    txt += '        ______________ \n        *Ideen von:*\n\n        -  口Ｋ丹爪工\n        -  Z⊙mb1¥\n        -  𐂅͑𒂭Ͳ̰hɇɌͥɘɑlUͣnͫicɵr͟ͷ𒂭𐂅͑'
    await b.sendText(a.from, `${txt}`)

}
const helpobj = {
    'command': `credits`,
    'categorie': 'Bot',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `credits`,
    'permission': 'foruser',
    'description': 'Gibt eine Liste aller Leute und Projekte die an diesem Bot mitgewirkt haben.'
};

module.exports = {
    credits,
    credit: credits,
    helpobj
}