async function reminder(a, b, eng) {
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
    if (!a.q.includes('/')) return await b.reply(a.from, eng.wrongFormat(), a.id)

    const timeRemind = a.q.substring(0, a.q.indexOf('/') - 1)
    const messRemind = a.q.substring(a.q.indexOf('/') + 1)
    const parsedTime = a.ms(a.toMs(timeRemind))
    a.reminder.addReminder(a.sender.id, messRemind, timeRemind)
    await b.sendTextWithMentions(a.from, eng.reminderOn(messRemind, parsedTime, a.sender))
    const intervRemind = setInterval(async () => {
        let now = Date.now();
        let reminderTime = await a.reminder.getReminderTime(a.sender.id);

        if (now >= reminderTime) {
            await b.sendTextWithMentions(a.from, eng.reminderAlert(await a.reminder.getReminderMsg(a.sender.id), a.sender))
            await a.db.removeId('reminder', a.sender.id)
            clearInterval(intervRemind)
        }
    }, 1000)


}
const helpobj = {
    'command': `reminder`,
    'categorie': 'Bot',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `reminder _zeit / einerung_`,
    'permission': 'foruser',
    'description': 'Sendet eine Erinnerung Nach Gewünschter Zeit.'
};

module.exports = {
    reminder,
    helpobj
}
