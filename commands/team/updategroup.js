async function updategroup(a, b, eng) {
    var { getRang } = a.importFresh('../../lib/rang.js');
    var isInhaber = await getRang('Inhaber', a.sender.id, a.db);
    if (!isInhaber) return await b.reply(a.from, eng.inhaberOnly(), a.id);
  
    try {
      var getGroupzgrouplist = await b.getAllGroups();
      var totalParticipants = 0;
      for (let i = 0; i < getGroupzgrouplist.length; i++) {
        var group = getGroupzgrouplist[i];
        if (group.name && group.groupMetadata.participants.length >= 5) {
            var groupData = {
            groupid: group.groupMetadata.id,
            sessionid: a.sessionId,
            gruppenname: group.name,
            teilnehmer: group.groupMetadata.participants.length,
          };
  
          // Ignoriere Team Gruppen!
          if (
            groupData.groupid === a.AdsGroupID ||
            groupData.groupid === a.RegGroupID ||
            groupData.groupid === a.DevGroupID ||
            groupData.groupid === a.ErrGroupID
          ) {
            continue; // Ignoriere die Gruppe und fahre mit der nächsten Iteration fort
          }
  
          // Überprüfe, ob der Eintrag bereits vorhanden ist
          var existingEntry = await a.db.getNeu('groups', { groupid: groupData.groupid });
  
          if (existingEntry) {
            // Eintrag vorhanden, aktualisiere ihn
            await a.db.update('groups', { groupid: groupData.groupid }, groupData);
          } else {
            // Eintrag nicht vorhanden, füge ihn hinzu
            await a.db.add('groups', groupData);
          }
  
          totalParticipants += group.groupMetadata.participants.length;
        }
      }
      await b.react(a.message.id, '✅️')
        } catch (err) {
      console.error(err);
      await b.react(a.message.id, '❌')
    }
  }
  

const helpobj = {
    'command': `updategroup`,
    'categorie': 'Team',
    'alias': ['no alias'], //diese aliase müssen unten angegeben werden: passwd, pw: passwd usw
    'usage': `updategroup`,
    'permission': 'updategroup',
    'description': 'Aktualisiert die Informationen in der Datenbank, groups.\n_Ignoriert Gruppen mit unter 5 Teilnehmern_'
};

module.exports = {
    updategroup,
    helpobj
}