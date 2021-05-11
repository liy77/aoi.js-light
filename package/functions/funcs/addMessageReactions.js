module.exports = async (d) => {
  const code = d.command.code;

  const r = code.split("$addMessageReactions").length - 1;

  const inside = code.split("$addMessageReactions")[r].after();

  const [channelID, messageID] = inside.splits;

  const channel = d.client.channels.cache.get(channelID);

  if (!channel)
    throw new Error(
      `❌ Invalid channel ID in \`$addMessageReactions${inside.total}\``
    );

  const msg = await channel.messages.fetch(messageID).catch((err) => null);

  if (!msg)
    throw new Error(
      `❌ Invalid message ID in \`$addMessageReactions${inside.total}\``
    );

  for (const reaction of inside.splits.slice(2)) {
    const m = await msg.react(reaction.addBrackets()).catch((err) => null);

    if (!m) throw new Error(`❌ Failed to react with ${reaction}`);
  }

  return {
    code: code.replaceLast(`$addMessageReactions${inside.total}`, ""),
  };
};
