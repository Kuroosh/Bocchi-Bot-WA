async function online(a, b, eng) {
    await b.react(a.message.id, '✅️')
}

const helpobj = {
    'permission': 'foruser',
};

module.exports = {
    online,
    helpobj
}