const axios = require("axios");
const parser = require("../../handlers/slashCommandOptionsParser");
module.exports = async (d) => {
  const code = d.command.code;

  const r = code.split(`$deleteSlashCommand`).length - 1;

  const inside = code.split(`$deleteSlashCommand`)[r].after();

  const err = d.inside(inside);

  if (err) throw new Error(err);

  const [guildID, option] = inside.splits;

  let commands;
    if(guildID == "global"){
        commands = await axios

    .get(

      d._api(`/applications/${d.client.user.id}/commands`),

      {

        headers: {

          Authorization: `Bot ${d.client.token}`,

        },

      }

    )

    .catch((err) => null);
    }
    else{
    commands = await axios
    .get(
      d._api(`/applications/${d.client.user.id}/guilds/${guildID}/commands`),
      {
        headers: {
          Authorization: `Bot ${d.client.token}`,
        },
      }
    )
    .catch((err) => null);
}
  if (!commands) throw new Error(`:x: Failed to fetch guild commands`);
  else commands = commands.data;

  const command = commands.find(
    (c) => c.name.toLowerCase() === option.toLowerCase() || c.id === option
  );

  if (!command)
    throw new Error(`❌ Could not find any command with name/id ${option}`);

  const request = axios
    .delete(
      d.client._api(
        `/applications/${d.client.user.id}/guilds/${guildID}/commands/${command.id}`
      ),
      {
        headers: {
          Authorization: `Bot ${d.client.token}`,
        },
      }
    )
    .catch((err) => null);

  if (!request)
    throw new Error(`❌ Failed to delete slash command ${command.name}`);

  return {
    code: code.replaceLast(`$deleteSlashCommand${inside}`, ""),
  };
};
