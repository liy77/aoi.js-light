module.exports = async (d) => {
  const code = d.command.code;

  const r = code.split("$createWebhook").length - 1;

  const inside = code.split("$createWebhook")[r].after();

  const err = d.inside(inside);

  if (err) throw new Error(err);

  const [
    channelID,
    name,
    avatar,
    returnW = "no",
    separator = "/",
  ] = inside.splits;
  //DBD.JS is cool xd
  const channel = d.client.channels.cache.get(channelID);

  if (!channel)
    throw new Error(`:x: Invalid channel ID in \`$createWebhook${inside}\``);

  const webhook = await channel
    .createWebhook(name, {
      avatar: avatar,
    })
    .catch((err) => null);

  if (!webhook) throw new Error(`:x: Failed to create webhook`);

  return {
    code: code.replaceLast(
      `$createWebhook${inside}`,
      returnW === "yes" ? webhook.id + separator + webhook.token : ""
    ),
  };
};
