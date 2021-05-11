module.exports = async (d) => {
  const code = d.command.code;
  const inside = d.unpack();
  const err = d.inside(inside);

  if (err) return throw new Error(err);

  const [variable, userID = d.message.author.id] = inside.splits;

  if (d.client.variables[variable] === undefined)
    return throw new Error(`:x: Variable '${variable}' not found`);

  if (!userID)
    return throw new Error(
      `:x: userID field not provided in \`$deleteGlobalUserVar${inside}\``
    );

  await d.client.db.delete("main", `${variable}_${userID}`);

  return {
    code: code.replaceLast(`$deleteGlobalUserVar${inside}`, ""),
  };
};
