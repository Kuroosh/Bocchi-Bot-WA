async function silvester(a, b, eng) {
    function calcTime(now, when) {
        var milliseconds = (when.getTime() - now.getTime())
        var seconds = Math.round((milliseconds / 1000) % 60);
        var minutes = Math.round(((milliseconds / (1000 * 60)) % 60));
        var hours = Math.round(((milliseconds / (1000 * 60 * 60)) % 24));
        var days = Math.round((milliseconds / (1000 * 60 * 60 * 24)));

        return `── 「 SILVESTER 」 ──
Es verbleiben noch
${days} Tage,
${hours} Stunden,
${minutes} Minuten
und ${seconds} Sekunden bis Silvester`
    }
    process.env.TZ = 'Europe/Berlin'
    var theDate = new Date()
    theDate.setFullYear(2023)
    theDate.setMonth(11)
    theDate.setDate(31)
    theDate.setHours(23)
    theDate.setMinutes(59)
    theDate.setSeconds(59)
    var now = new Date()
    var result = calcTime(now, theDate)
    await b.sendText(a.from, result)
}
const helpobj = {
    'command': `silvester`,
    'categorie': 'Fun',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `silvester`,
    'permission': 'foruser',
    'description': 'Zeigt die aktuelle Zeit bis Silvester.'
};

module.exports = {
    silvester,
    helpobj
}