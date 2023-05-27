async function datadelete(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    if (a.isGroupMsg) return await b.reply(a.from, eng.pcOnly(), a.id)
    if (!isRegistered) return await b.reply(a.from, `Du bist noch Nicht registriert!`, a.id)
    if (a.args[0] === 'confirm') {
        await a.db.removeId('registered', a.sender.id)
        await a.db.removeId('premium', a.sender.id)
        await a.db.removeId('level', a.sender.id)
        await b.sendText(a.from, `Erfolgreich *Alle* Daten gelöscht`)
    } else {
        await b.sendText(a.from, `Bitte bestätige mit ${a.prefix}datadelete confirm. \nBeim bestätigen werden alle Informationen *unwideruflich* von dir gelöscht\n- _Level/xp_\n- _Premium_\n- _Registrierung_\n\n_Möchtest du allerdings nur deinen Namen ändern probiere -> ${a.prefix}unregister_`)
    }

}
const helpobj = {
    'command': `datadelete`,
    'categorie': 'Bot',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `datadelete`,
    'permission': 'foruser',
    'description': 'Führe den Befehls aus falls du deine Daten Löschen möchtest.\n_Keine Sorge man muss es noch bestätigen._'
};

module.exports = {
    datadelete,
    helpobj
}