module.exports = async (d) => {
  const code = d.command.code;

  const r = code.split("$getBanReason").length - 1;

  const inside = code.split("$getBanReason")[r].after();

  const err = d.inside(inside);

  if (err) return throw new Error(err);

  const [userID, guildID = d.message.guild.id] = inside.splits;

  const guild = d.client.guilds.cache.get(guildID);

  if (!guild)
    return throw new Error(`❌ Invalid guild ID in \`$getBanReason${inside}\``);

  const ban = await guild.fetchBan(userID).catch((err) => null);

  if (!ban) return throw new Error(`❌ Unknown ban in \`$getBanReason${inside}\``);

  return {
    code: code.replaceLast(
      `$getBanReason${inside}`,
      (ban.reason || "").deleteBrackets()
    ),
  };
};
