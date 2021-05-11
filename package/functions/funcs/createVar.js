module.exports = async (d) => {
  const code = d.command.code;
  const inside = d.unpack();
  const err = d.inside(inside);

  if (err) throw new Error(err);

  const [...variables] = inside.splits;

  for (let variable of variables) {
    variable = variable.addBrackets();

    const [varName, ...varValue] = variable.split(":");

    d.client.variables[varName] = varValue.join(":");
  }

  return {
    code: code.replaceLast(`$createVar${inside}`, ""),
  };
};
