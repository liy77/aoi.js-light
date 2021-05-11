module.exports = async (d) => {
  const code = d.command.code;

  const r = code.split("$getEmbed").length - 1;

  const inside = code.split("$getEmbed")[r].after();

  const err = d.inside(inside);

  if (err) throw new Error(err);

  const [channelID, messageID, option = "description"] = inside.splits;

  const channel = d.message.guild.channels.cache.get(channelID);

  if (!channel)
    throw new Error(`:x: Invalid channel ID in \`$getEmbed${inside}\``);

  const msg = await channel.messages.fetch(messageID).catch((err) => {});

  if (!msg) throw new Error(`:x: Invalid message ID in \`$getEmbed${inside}\``);

  if (!msg.embeds[0]) throw new Error(`:x: Message contains no embeds`);

  const options = {
    title: "title",
    footer: "footer ? footer.text : undefined",
    author: "author ? author.name : undefined",
    color: "hexColor",
    description: "description",
    field: "fields[0] ? fields[0].name : undefined",
    fvalue: "fields[0] ? fields[0].value : undefined",
    thumbnail: "thumbnail ? thumbnail.url : undefined",
  }[option.toLowerCase()];

  //if (!options) throw new Error(`:x: Invalid options in \`$getEmbed[${inside}]\``)

  const opt = eval(
    options
      ? `msg.embeds[0].${options.replace("? ", "? msg.embeds[0].")}`
      : `msg.embeds[0].${option.addBrackets()}`
  );

  return {
    code: code.replaceLast(
      `$getEmbed${inside}`,
      typeof opt === "string" ? opt.deleteBrackets() : opt || ""
    ),
  };
};