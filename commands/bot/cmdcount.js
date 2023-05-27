async function cmdcount(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isLeitung = await getRang('isLeitung', a.sender.id, a.db)

    var cmdcount = 50
    const CommandAll = await a.db.count('log2')
    var alllogCmdCount = CommandAll + 3077538
    var leaderCMD = await a.db.getCMDLeader(cmdcount);
    let leaderboardCMD = '── *「 🏆 RANGLISTE 🏆 」* ──\n\n'
    try {
        for (let i = 0; i < leaderCMD.length; i++) {
            var leadernameCMD = (await a.db.getId('registered', leaderCMD[i].userid)).name
            if (a.ar[0] == 'owner') {
                if (!isLeitung) return await b.reply(a.from, eng.leitungOnly(), a.id)
                leaderboardCMD += `${i + 1}.Name: ${leadernameCMD} \nwa.me/${leaderCMD[i].userid.replace('@c.us', '')} \n➸ * Commands *: ${leaderCMD[i].cmd} \n\n`
            } else {
                leaderboardCMD += `${i + 1}.Name: ${leadernameCMD} \n➸ * Commands *: ${leaderCMD[i].cmd} \n\n`
            }
        }
    } catch (err) {
        console.error(err)
    }
    await b.reply(a.from, `Seit dem 20.08.2021 um 00: 00 wurden ${alllogCmdCount} Befehle ausgeführt!\n\nDie TOP ${cmdcount} meisten Befehle wurden ausgeführt von: \n${leaderboardCMD} \n`, a.id)
}
const helpobj = {
    'command': `cmdcount`,
    'categorie': 'Bot',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `cmdcount`,
    'permission': 'foruser',
    'description': 'Zeigt die Anzahl aller ausgeführten Befehle und eine Liste der Top 50 Nutzer der meist genutzten Befehle.'
};
module.exports = {
    cmdcount,
    helpobj
}                