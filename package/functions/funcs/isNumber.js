module.exports = (d) => {
  const code = d.command.code;

  const inside = d.unpack();
  const err = d.inside(inside);

  if (err) throw new Error(err);

  const n = Number(inside.inside);

  return {
    code: code.replaceLast(
      `$isNumber${inside}`,
      inside.inside === "" ? false : isNaN(inside.inside) ? false : true
    ),
  };
};
