module.exports = async (d) => {
  const code = d.command.code;

  const r = code.split("$addObjectProperty").length - 1;

  const inside = code.split("$addObjectProperty")[r].after();

  const err = d.inside(inside);

  if (err) throw new Error(err);

  const [key, value] = inside.splits;

  if (!d.object)
    throw new Error(
      `❌ No object present in \`$addObjectProperty${inside.total}\``
    );

  let result = "";

  try {
    result = JSON.parse(value.addBrackets());
  } catch {
    result = value;
  }

  d.object[key] = result;

  return {
    object: d.object,
    code: code.replaceLast(`$addObjectProperty${inside.total}`, ""),
  };
};
