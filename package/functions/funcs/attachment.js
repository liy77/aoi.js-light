const { MessageAttachment } = require("discord.js-light");

module.exports = async (d) => {
  const code = d.command.code;

  const r = code.split("$attachment").length - 1;

  const inside = code.split("$attachment")[r].after();

  const err = d.inside(inside);

  if (err) throw new Error(err);

  const [url, name = "image.webp", type = "url"] = inside.splits;

  const attachment = new MessageAttachment(
    type === "buffer" ? Buffer.from(url.addBrackets()) : url.addBrackets(),
    name.addBrackets()
  );

  return {
    code: code.replaceLast(`$attachment${inside.total}`, ""),
    embed: d.embed.attachFiles(attachment),
  };
};
