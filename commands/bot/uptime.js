async function uptime(a, b, eng) {
    const formater = (seconds) => {
        const pad = (s) => { return (s < 10 ? '0' : '') + s }
        const hrs = Math.floor(seconds / (60 * 60))
        const mins = Math.floor(seconds % (60 * 60) / 60)
        const secs = Math.floor(seconds % 60)
        return ' ' + pad(hrs) + ':' + pad(mins) + ':' + pad(secs)
    }
    const uptime = process.uptime()
    await b.reply(a.from, `*── 「 BOT UPTIME 」 ──*\n\n❏${formater(uptime)}`, a.id)
}
const helpobj = {
    'command': `uptime`,
    'categorie': 'Bot',
    'alias': ['runtime'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `uptime`,
    'permission': 'foruser',
    'description': 'Sende die Zeit wie lange der Bot schon läuft ohne Restart.'
};

module.exports = {
    uptime,
    runtime: uptime,
    helpobj
}