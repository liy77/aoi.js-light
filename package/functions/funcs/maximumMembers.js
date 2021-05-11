module.exports = async (d) => {
  const code = d.command.code;

  const inside = d.unpack();

  if (inside.inside) {
    const guild = d.client.guilds.cache.get(inside.inside);

    if (!guild)
      throw new Error(`:x: Invalid guild ID in \`$maximumMembers${inside}\``);

    return {
      code: code.replaceLast(
        `$maximumMembers${inside}`,
        guild.maximumMembers
      ),
    };
  } else {
    return {
      code: code.replaceLast(
        `$maximumMembers`,
        d.message.guild.maximumMembers
      ),
    };
  }
};
