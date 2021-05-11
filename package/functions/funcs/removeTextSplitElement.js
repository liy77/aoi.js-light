module.exports = async (d) => {
  const code = d.command.code;

  const inside = d.unpack();
  const err = d.inside(inside);

  if (err) return throw new Error(err);

  const n = Number(inside.inside);

  if (!n)
    return throw new Error(
      `:x: Invalid number in \`$removeTextSplitElement${inside}\``
    );

  return {
    array: d.array.filter((value, y) => y !== n - 1),
    code: code.replaceLast(`$removeTextSplitElement${inside}`, ""),
  };
};
