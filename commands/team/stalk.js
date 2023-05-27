async function stalk(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isOwner = await getRang('isOwner', a.sender.id, a.db)
    if (!isOwner) return await b.reply(a.from, eng.inhaberOnly(), a.id)
    if (!a.args[0]) return b.reply(a.from, `Verwenden Sie den Befehl like : ${a.prefix}stalk <number>xxx`, a.id)
    var inputnumber = a.args[0]
    if (!inputnumber.includes('x')) return b.reply(a.from, 'Sie haben x nicht hinzugefÃ¼gt', a.id)
    b.reply(a.from, `Suche nach WhatsApp-Konto im angegebenen Bereich...`, a.id)
    b.reply(a.from, `Bitte warten Sie, wÃ¤hrend ich Details abrufe...`, a.id)
    function countInstances(string, word) {
        return string.split(word).length - 1;
    }
    var number0 = inputnumber.split('x')[0]
    var number1 = inputnumber.split('x')[countInstances(inputnumber, 'x')] ? inputnumber.split('x')[countInstances(inputnumber, 'x')] : ''
    var random_length = countInstances(inputnumber, 'x')
    var randomxx;
    if (random_length == 1) {
        randomxx = 10
    } else if (random_length == 2) {
        randomxx = 100
    } else if (random_length == 3) {
        randomxx = 1000
    }
    var nomerny = `ã€Ž Liste der WhatsApp-Nummern ã€\n\n`
    var nobio = `\n*NO WHATSAPP.*\n`
    var nowhatsapp = `\n*Nummern ohne WhatsApp-Konto innerhalb des von Ihnen angegebenen Bereichs*\n`
    for (let i = 0; i < randomxx; i++) {
        var nu = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
        var status1 = nu[Math.floor(Math.random() * nu.length)]
        var status2 = nu[Math.floor(Math.random() * nu.length)]
        var status3 = nu[Math.floor(Math.random() * nu.length)]
        var dom4 = nu[Math.floor(Math.random() * nu.length)]
        var rndm;
        if (random_length == 1) {
            rndm = `${status1}`
        } else if (random_length == 2) {
            rndm = `${status1}${status2}`
        } else if (random_length == 3) {
            rndm = `${status1}${status2}${status3}`
        } else if (random_length == 4) {
            rndm = `${status1}${status2}${status3}${dom4}`
        }
        var anu = await b.checkNumberStatus(`${number0}${i}${number1}@c.us`);
        var anustatus = anu.status
        var anuu = anu.length !== 0 ? anu : false
        try {
            if (anustatus == '404') {
                nobio += `wa.me/${anu.id.split("@")[0]}\n`
            } else {
                nomerny += `ðŸŽ€ Number: wa.me/${anu.id.split("@")[0]}\n`
            }
        } catch {
            nowhatsapp += `no whatsapp: ${number0}${i}${number1}\n`
        }
    }
    b.reply(a.from, `${nomerny}${nobio}${nowhatsapp}`, a.id)
}
const helpobj = {
    'permission': 'stalk',
};

module.exports = {
    stalk,
    helpobj
}