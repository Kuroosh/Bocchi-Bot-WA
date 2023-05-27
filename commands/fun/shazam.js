
async function shazam(a, b, eng) {
  const decryptMedia = require('@open-wa/wa-automate').decryptMedia;
  const apikey = '28a18b68f0msh0f11576a292d903p105e7ajsn68a907bd1e54'
  const axios = require("axios");
  const { exec } = require("child_process");
  const isRegistered = await a.db.containsId('registered', a.sender.id)
  if (!isRegistered) return await b.reply(a.from, eng.notRegistered(), a.id)
  if (a.quotedMsg) {
    if (a.quotedMsgObj.mimetype && a.quotedMsgObj.type == 'ptt' || a.quotedMsgObj.type == 'audio') {
      const filename = `wa_voice.ogg`;
      const mediaData = await decryptMedia(a.quotedMsgObj);
      a.fs.writeFile(filename, mediaData, function (err) {
        if (err) {
          return console.log(err);
        }
        exec("ffmpeg -y -i wa_voice.ogg -ar 44100 -ac 1 -acodec pcm_s16le -aframes 300 output.wav", (error, stdout, stderr) => {
          if (error) {
            b.reply(a.from, 'Für diese Audio konnte kein Treffer gefunden werden. \nEntweder ist sie undeutlich oder die Datei kann nicht bearbeitet werden. \nFalls es eine Audio als Datei war, probiere es bitte nochmal mit einer Sprachnachricht wenn möglich.')
            return;
          }
          const contents = a.fs.readFileSync('output.wav', { encoding: 'base64' });

          var options = {
            method: 'POST',
            url: 'https://shazam.p.rapidapi.com/songs/v2/detect',
            params: { timezone: 'America/Chicago', locale: 'en-US' },
            headers: {
              'content-type': 'text/plain',
              'x-rapidapi-host': 'shazam.p.rapidapi.com',
              'x-rapidapi-key': apikey
            },
            data: contents
          };

          axios.request(options).then(function (response) {
            if (response.data.matches && response.data.track) {
              b.reply(a.from, `
[SHAZAM]
*? Song gefunden! ?*
${response.data.track.title} von ${response.data.track.subtitle}
${response.data.track.url}`, a.id)
            } else {
              b.reply(a.from, "[SHAZAM]\n?? - Es konnte kein Song gefunden werden.", a.id)
            }
          }).catch(function (error) {
            console.error(error);
          });
        });
      });
    } else {
      b.reply(a.from, 'Bitte markiere eine *Sprachnachricht* oder eine *Audio* um Shazam nutzen zu können.', a.id)
    }
  } else {
    b.reply(a.from, 'Bitte markiere eine Sprachnachricht oder eine Audio um Shazam nutzen zu können.', a.id)
  }
}
const helpobj = {
  'command': `shazam`,
  'categorie': 'Fun',
  'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
  'usage': `shazam _audio-markieren_`,
  'permission': 'foruser',
  'description': 'Sendet einen Link zum Lied welches in dem Audio abgespelt wird.'
};

module.exports = {
  shazam,
  helpobj
}