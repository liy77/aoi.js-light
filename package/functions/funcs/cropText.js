const { splitMessage } = require("discord.js-light");

module.exports = async (d) => {
  const code = d.command.code;
  const inside = d.unpack();
  const err = d.inside(inside);

  if (err) return throw new Error(err);

  let [text, limit, charToSplit = "", append = ""] = inside.splits;

  limit = Number(limit);

  if (!limit) return throw new Error(`:x: Invalid number in \`$cropText${inside}\``);

  let texts;

  try {
    texts = splitMessage(text, {
      maxLength: limit,
      char: charToSplit,
    });
  } catch {
    texts = [text];
  }

  text = `${texts[0]}${texts.length > 1 ? append : ""}`;

  return {
    code: code.replaceLast(`$cropText${inside}`, text),
  };
};
