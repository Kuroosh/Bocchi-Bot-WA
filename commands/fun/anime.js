async function anime(a, b, eng) {

    /*

var caption = text hier
if(image)
sendImage(from, image, caption) 
else
sendText(from, caption)

wenn kein bild gefunden. sende text ohne bild
bzw
if(!image) return sendText
sendImage
oder
if(!image) image = errorImage
sendImage

    */
    const isRegistered = await a.db.containsId('registered', a.sender.id)
    const isNsfw = a.isGroupMsg ? await a.db.groupinfoId('nsfw', a.groupId) : false
    const isGaming = a.isGroupMsg ? await a.db.groupinfoId('gaming', a.groupId) : false
    const isPremium = await a.db.containsId('premium', a.sender.id)
    var tag = a.args[0]
    if (typeof a.ar[0] == typeof undefined) {
        await b.sendText(a.from, 'Du musst einen Anime nennen über den du dich Informieren möchtest.')
        return
    }
    a.anime.anime(tag)
        .then((data) => {
            //Der Output enthält extrem viele Daten....
            if (data.meta.count == '0') {
                b.sendText(a.from, 'Es konnte kein Anime gefunden werden, versuch einen anderen Begriff')
                return
            } else {
                b.sendText(a.from, `
Titel: ${data.data[0].attributes.titles.en?.replace('undefined', '')} ${data.data[0].attributes.titles.ja_jp?.replace('undefined', '')}

Beschreibung: ${data.data[0].attributes.description}

Altersfreigabe: ${data.data[0].attributes.ageRatingGuide}
Video: https://youtube.com/watch?v=${data.data[0].attributes.youtubeVideoId} _(Video möglicherweise gesperrt)_
`)
                b.sendFileFromUrl(a.from, data.data[0].attributes.posterImage.large, 'large.jpg', `${data.data[0].attributes.titles.en.replace('undefined', '')} ${data.data[0].attributes.titles.ja_jp.replace('undefined', '')}`)
            }
        })
        .catch((err) => {
            console.log(err);
            b.sendText(a.from, 'Es ist ein Fehler bei der suche Aufgetreten')
        });
}

const helpobj = {
    'command': `anime`,
    'categorie': 'Fun',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `anime _animename_`,
    'permission': 'foruser',
    'description': 'Sendet Infos über einen Anime deiner Wahl'
};


module.exports = {
    anime,
    helpobj
}