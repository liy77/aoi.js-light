module.exports = async (d) => {
  const code = d.command.code;

  const r = code.split("$colorRole").length - 1;

  const inside = code.split("$colorRole")[r].after();

  const err = d.inside(inside);

  if (err) throw new Error(err);

  const [roleID, color] = inside.splits;

  const role = d.message.guild.roles.cache.get(roleID);

  if (!role) throw new Error(`:x: Invalid role ID in \`$colorRole${inside}\``);

  const re = await role.setColor(color).catch((err) => {});

  if (!re)
    throw new Error(`:x: Failed to change ${role.name} color to ${color}!`);

  return {
    code: code.replaceLast(`$colorRole${inside}`, ""),
  };
};
