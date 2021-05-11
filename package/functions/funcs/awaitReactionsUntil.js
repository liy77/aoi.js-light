const embed = require("../../handlers/errors");
const interpreter = require("../../interpreter");
const ms = require("ms");

module.exports = async (d) => {
  const code = d.command.code;

  const r = code.split("$awaitReactionsUntil").length - 1;

  const inside = code.split("$awaitReactionsUntil")[r].after();

  const err = d.inside(inside);

  if (err) throw new Error(err);

  const [
    channelID,
    messageID,
    userFilter,
    time,
    reactionOrReactions,
    countOrCounts,
    commandOrCommands,
    error,
  ] = inside.splits;

  const channel = d.client.channels.cache.get(channelID);

  if (!channel)
    throw new Error(
      `❌ Invalid channel ID in \`$awaitReactionsUntil${inside}\``
    );

  const msg = await channel.messages.fetch(messageID).catch((err) => null);

  if (!msg)
    throw new Error(
      `❌ Invalid message ID in \`$awaitReactionsUntil${inside}\``
    );

  const timer = ms(time);

  if (!timer)
    throw new Error(`❌ Invalid duration in \`$awaitReactionsUntil${inside}\``);

  const reactions = reactionOrReactions.addBrackets().split(",");

  const commands = commandOrCommands.split(",");

  const counts = countOrCounts.split(",").map((c) => Number(c));

  if (counts.includes(NaN))
    throw new Error(`❌ Invalid counts in \`$awaitReactionsUntil${inside}\``);

  let i = 0;

  for (const _ of counts) {
    const filter = (r, u) => {
      return userFilter === "everyone"
        ? d.client.user.id !== u.id
        : userFilter.split(",").some((id) => u.id === id) &&
            r.emoji.toString() === reactions[i];
    };

    const count = counts[i];

    const cmd = d.client.awaited_commands.find((c) => c.name === commands[i]);

    const reaction = reactions[i];

    console.log(counts.length, counts);

    if (!cmd && counts[i])
      throw new Error(`❌ Invalid awaited command '${commands[i]}' `);

    msg
      .awaitReactions(filter, {
        max: count,
        time: timer,
        errors: ["time"],
      })
      .then((collected) => {
        interpreter(d.client, d.message, d.args, cmd);
      })
      .catch((err) => {
        if (!err.message) {
          embed(d, error, undefined, d.channel);
        } else throw new Error(`❌ ${err.message}`);
      });

    i++;
  }

  return {
    code: code.replaceLast(`$awaitReactionsUntil${inside}`, ""),
  };
};
