module.exports = async (d) => {
  const code = d.command.code;

  const r = code.split("$addEmoji").length - 1;

  const inside = code.split("$addEmoji")[r].after();

  const err = d.inside(inside);

  if (err) throw new Error(err);

  const options = ([url, name, returnEmoji = "no", ...roleIDs] = inside.splits);

  const emoji = await d.message.guild.emojis
    .create(
      url.addBrackets(),
      name.addBrackets(),
      roleIDs.length
        ? {
            roles: roleIDs,
          }
        : undefined
    )
    .catch((err) => {});

  if (!emoji)
    throw new Error(`:x: Failed to create emoji! url: ${url}, name: ${name} `);

  return {
    code: code.replaceLast(
      `$addEmoji${inside.total}`,
      returnEmoji === "yes" ? emoji.toString() : ""
    ),
  };
};
