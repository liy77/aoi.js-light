module.exports = async d => {
    const code = d.command.code 
    
	const inside = d.unpack()
	const err = d.inside(inside)

    if (err) return throw new Error(err)

    const [webhookID, webhookToken, name, avatar] = inside.splits
    
    const webhook = await d.client.fetchWebhook(webhookID, webhookToken).catch(err => null) 
    
    if (!webhook) return throw new Error(`❌ Invalid webhook token or ID in \`$modifyWebhook${inside}\``) 
    
    const w = await webhook.edit({
        name, 
        avatar
    }).catch(err => null) 
    
    if (!w) return throw new Error(`❌ Failed to modify webhook!`) 
    
    return {
        code: code.replaceLast(`$modifyWebhook${inside}`, "")
    }
}