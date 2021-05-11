module.exports = async (d) => {
  let code = d.command.code;

  const r = code.split("$changeNickname").length - 1;

  const inside = code.split("$changeNickname")[r].after();

  const err = d.inside(inside);

  if (err) throw new Error(err);

  const [userID = d.message.author.id, nickname] = inside.splits;

  if (!nickname)
    throw new Error(
      `:x: Nickname can't be empty in \`$changeNickname${inside}\``
    );

  const member = await d.message.guild.members.fetch(userID).catch((err) => {});

  if (!member)
    throw new Error(`:x: Invalid user ID in \`$changeNickname${inside}\``);

  const m = await member.setNickname(nickname.addBrackets()).catch((err) => {});

  if (!m)
    throw new Error(
      `:x: Failed to change nickname for user ${member.user.username}`
    );

  return {
    code: code.replaceLast(`$changeNickname${inside}`, ""),
  };
};
