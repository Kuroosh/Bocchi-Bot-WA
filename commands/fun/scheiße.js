async function scheiße(a, b, eng) {
    await b.react(a.quotedMsgObj.id, "💩")
}
const helpobj = {
    'permission': 'foruser',
};

module.exports = {
    scheiße,
    helpobj
}