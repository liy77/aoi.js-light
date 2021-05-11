const setVar = async (d) => {
  const code = d.command.code;

  const inside = d.unpack();
  const err = d.inside(inside);

  if (err) throw new Error(err);

  const [variable, value] = inside.splits;

  if (d.client.variables[variable] === undefined)
    throw new Error(`:x: Variable '${variable}' not found`);

  await d.client.db.set("main", variable, value);

  return {
    code: code.replaceLast(`$setVar${inside}`, ""),
  };
};

module.exports = setVar;
