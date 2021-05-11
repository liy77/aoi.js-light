module.exports = async (d) => {
  let code = d.command.code;

  const r = code.split("$deafenUser").length - 1;
  const inside = code.split("$deafenUser")[r].after();

  if (!inside.splits.length)
    return throw new Error(`:x: Invalid usage in $deafenUser${inside.total}`);

  const [userID, deaf = "yes", reason] = inside.splits;

  const user = await d.message.guild.members.fetch(userID).catch((err) => {});

  if (!user)
    return throw new Error(`:x: Invalid userID in \`$deafenUser${inside.total}\``);

  const state = d.message.guild.voiceStates.cache.get(user.id);

  if (!state || !state.channel)
    return throw new Error(
      `:x: User is not in any voice channel in \`$deafenUser${inside.total}\``
    );

  try {
    await state.setDeaf(deaf.toLowerCase() === "yes", reason);
  } catch {
    return throw new Error(
      `:x: Failed to deafen member in \`$deafenUser${inside.total}\``
    );
  }

  return {
    code: code.replaceLast(`$deafenUser${inside.total}`, ""),
  };
};
