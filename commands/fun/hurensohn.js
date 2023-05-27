async function hurensohn(a, b, eng) {
    await b.reply(a.from, `@ADMINS\n\nDie Makierte Person möchte Bitte gekickt werden, vielen Dank!`, a.id)
}
const helpobj = {
    'permission': 'foruser',
};
module.exports = {
    hurensohn,
    helpobj
}