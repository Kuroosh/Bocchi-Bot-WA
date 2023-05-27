async function stayhigh(a, b, eng) {
    const msg = await b.sendText(a.from, `𝘿𝙊𝙉𝙏 𝘾𝙍𝙔
𝙎𝙏𝘼𝙔 𝙃𝙄𝙂𝙃

𝟜𝟚𝟘 𝔽𝕆ℝ 𝕃𝕀𝔽𝔼 💚`)
    await b.react(msg, "💚")
}
const helpobj = {
    'command': `stayhigh`,
    'categorie': 'Fun',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `stayhigh`,
    'permission': 'foruser',
    'description': 'Always stay high..'
};

module.exports = {
    stayhigh,
    helpobj
}