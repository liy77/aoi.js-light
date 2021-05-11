module.exports = async (d) => {
  const code = d.command.code;

  const r = code.split("$clearReaction[").length - 1;

  const inside = code.split("$clearReaction")[r].after();

  const err = d.inside(inside);

  if (err) throw new Error(err);

  const [channelID, messageID, userID, emojiOptions = "all"] = inside.splits;

  const channel = d.client.channels.cache.get(channelID);

  if (!channel)
    throw new Error(`❌ Invalid channel ID in \`$clearReaction${inside}\``);

  const msg = await channel.messages.fetch(messageID).catch((err) => null);

  if (!msg)
    throw new Error(`❌ Invalid message ID in \`$clearReaction${inside}\``);

  const user = await d.client.users.fetch(userID).catch((err) => null);

  if (!user)
    throw new Error(`❌ Invalid user ID in \`$clearReaction${inside}\``);

  const emoji = emojiOptions.includes("<")
    ? emojiOptions.split(":")[2].split(">")[0]
    : emojiOptions;

  try {
    await msg.reactions.cache.get(emoji).users.remove(userID);
  } catch (err) {
    return {
      code: code.replaceLast(`$clearReaction${inside}`, ""),
    };
  }

  return {
    code: code.replaceLast(`$clearReaction${inside}`, ""),
  };
};
