async function reghg(a, b, eng) {
    async function hgvgCheck(tagName) {
        return (await a.db.containsNeu('hgvg', { 'vg': tagName }));
    }
    async function hgvgItem(tagName) {
        var g = await adb.getNeu('hgvg', { 'vg': tagName })
        if (typeof g === typeof undefined) {
            return "LEER";
        }
        return g.hg;
    }
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isOwner = await getRang('isOwner', a.sender.id, a.db)

    if (!isOwner) return await b.reply(a.from, eng.ownerOnly(), a.id)
    if (a.ar[0].length > 35 || a.ar[1].length > 35 || a.ar[0].length < 21 || a.ar[1].length < 21) return await b.reply(a.from, `Das ist Keine Gruppen-ID(@g.us)`, a.id)
    if (a.ar.length > 2) return await b.reply(a.from, `Du kannst nur zwei Gruppen miteinander Verbinden!`, a.id)
    if (a.ar[0] == a.ar[1]) return await b.reply(a.from, `Denk nicht mal dran, danke...Du versuchst die gleiche GruppenID zu verbinden`, a.id)
    if (!a.ar[0].includes('@g.us') || !a.ar[1].includes('@g.us')) return await b.reply(a.from, `Das ist Keine Gruppen-ID(@g.us)`, a.id)
    if (!a.isGroupMsg) return await b.reply(a.from, eng.groupOnly(), a.id)
    if (!a.ar[0]) return await b.reply(a.from, "Trage zuerst VG dann HG ein", a.id)
    if (a.isMe) {
        if (await hgvgCheck(a.ar[0])) {
            if (await hgvgCheck(a.ar[1])) {
                b.reply(a.from, "Fehler. Beide Gruppen bereits verlinkt.", a.id)
            } else {
                b.reply(a.from, "Die Hauptgruppe wurde bereits verlinkt.", a.id)
            }
        } else {
            var groupt0g3 = { "hg": a.ar[1], "vg": a.ar[0] }
            await a.db.add('hgvg', groupt0g3)
            b.reply(a.from, "Die Gruppen wurden nun miteinander Verbunden.", a.id)
        }
    } else {
        await b.reply(a.from, `Markiere einen Bot!`, a.id)
    }
}

const helpobj = {
    'command': `reghg`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `reghg _vg-id hg-id_`,
    'permission': 'reghg',
    'description': 'Der Bot verbindet die Vorgruppe mit der Hauptgruppe.'
};

module.exports = {
    reghg,
    helpobj
}
