const { Collection } = require("discord.js-light");

module.exports = async (d) => {
  const code = d.command.code;

  const r = code.split("$createCollection").length - 1;

  const name = code.split("$createCollection")[r].after();

  if (!name.inside) throw new Error(`:x: Invalid usage in $ban${inside}`);

  d.client.collections[name.inside.addBrackets()] = new Collection();

  return {
    code: code.replaceLast(`$createCollection${name}`, ""),
  };
};
