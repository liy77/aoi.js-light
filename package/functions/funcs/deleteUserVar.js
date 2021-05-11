module.exports = async (d) => {
  const code = d.command.code;
  const inside = d.unpack();
  const err = d.inside(inside);

  if (err) throw new Error(err);

  const [
    variable,
    userID = d.message.author.id,
    guildID = d.message.guild ? d.message.guild.id : "",
  ] = inside.splits;

  if (d.client.variables[variable] === undefined)
    throw new Error(`:x: Variable '${variable}' not found`);

  if (!userID)
    throw new Error(
      `:x: userID field not provided in \`$deleteUserVar${inside}\``
    );

  if (!guildID)
    throw new Error(
      `:x: guildID field not provided in \`$deleteUserVar${inside}\``
    );

  await d.client.db.delete("main", `${variable}_${guildID}_${userID}`);

  return {
    code: code.replaceLast(`$deleteUserVar${inside}`, ""),
  };
};
