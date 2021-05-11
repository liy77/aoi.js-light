const { MessageAttachment } = require("discord.js-light");

module.exports = async (d) => {
  const code = d.command.code;

  const r = code.split("$createFile").length - 1;

  const inside = code.split("$createFile")[r].after();

  const err = d.inside(inside);

  if (err) throw new Error(err);

  const fields = inside.splits;

  const name = fields.pop().addBrackets();

  const text = fields.join(";").addBrackets();

  const attachment = new MessageAttachment(Buffer.from(text), name);

  return {
    code: code.replaceLast(`$createFile${inside}`, ""),
    embed: d.embed.attachFiles(attachment),
  };
};
