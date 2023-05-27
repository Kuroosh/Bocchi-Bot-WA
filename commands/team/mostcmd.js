async function mostcmd(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isTeam = await getRang('isTeam', a.sender.id, a.db)

    if (!isTeam) return await b.reply(a.from, eng.teamOnly(), a.id)
    var _mostcmd;
    if (!a.ar[0]) {
        _mostcmd = 10
    } else {
        _mostcmd = a.args[0]
    }

    const mostcmd = await a.db.getCommands('log', _mostcmd) //so? denke 
    console.log(mostcmd)
    let mostcmdTxt = "";
    mostcmd.forEach(e => {
        mostcmdTxt += e.c + '  ' + e.command + '\r\n';
    });
    await b.sendText(a.from, mostcmdTxt) //so?
}
const helpobj = {
    'command': `mostcmd`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `mostcmd _Anzahl_ (standart 10)`,
    'permission': 'mostcmd',
    'description': 'Sendet eine Liste der meistgenutzten Befehle'
};

module.exports = {
    mostcmd,
    helpobj
}