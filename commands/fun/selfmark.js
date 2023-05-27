async function selfmark(a, b, eng) {
    await b.sendTextWithMentions(a.from, `@${a.sender.id.replace(/@c.us/g, '')}`)
}
const helpobj = {
    'command': `selfmark`,
    'categorie': 'Fun',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `selfmark`,
    'permission': 'foruser',
    'description': 'Markiert dich selbst.'
};

module.exports = {
    selfmark,
    helpobj
}