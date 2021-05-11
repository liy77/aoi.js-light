module.exports = async (d) => {
  const code = d.command.code;

  const r = code.split("$deleteWebhook").length - 1;

  const inside = code.split("$deleteWebhook")[r].after();

  const err = d.inside(inside);

  if (err) return throw new Error(err);

  const [webhookID, webhookToken] = inside.splits;

  const webhook = await d.client
    .fetchWebhook(webhookID, webhookToken)
    .catch((err) => null);

  if (!webhook)
    return throw new Error(
      `❌ Invalid webhook ID or token in \`$deleteWebhook${inside}\``
    );

  const w = await webhook.delete().catch((err) => null);

  if (!w) return throw new Error(`❌ Failed to delete webhook`);

  return {
    code: code.replaceLast(`$deleteWebhook${inside}`, ""),
  };
};
