async function openai(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js')
    var isTeam = await getRang('isTeam', a.sender.id, a.db)
    const isRegistered = await a.db.containsId('registered', a.sender.id)

    if (!isTeam) return await bocchi.reply(from, eng.teamOnly(), id)
    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
        apiKey: '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',
    });
    const openai = new OpenAIApi(configuration)
    const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: a.q,
        temperature: 0,
        max_tokens: 4000
    })
    await b.reply(a.from, `Die antwort auf deine Frage\n_${a.q}_\nlautet: \n${completion.data.choices[0].text.replace('?', '').replace('\n', '')}`, a.id)
    // console.log(completion.data.choices[0].text)


}
const helpobj = {
    'command': `openai`,
    'categorie': 'Team',
    'alias': ['gpt'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `openai _deine-frage_`,
    'permission': 'openai',
    'description': 'Beantwortet mit Hilfe von Chat-gpt alle Fragen.'
};

module.exports = {
    openai,
    gpt: openai,
    helpobj
}
