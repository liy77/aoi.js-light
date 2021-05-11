module.exports = async (d) => {
  const code = d.command.code;
  const inside = d.unpack();

  if (!d.inside(inside)) {
    const guild = d.client.guilds.cache.get(inside.inside);

    if (!guild) throw new Error(`:x: Invalid guildID in \`$mfaLevel${inside}\``);

    return {
      code: code.replaceLast(`$mfaLevel${inside}`, guild.mfaLevel === 1),
    };
  } else {
    return {
      code: code.replaceLast(
        `$mfaLevel${inside}`,
        d.message.guild.mfaLevel === 1
      ),
    };
  }
};
