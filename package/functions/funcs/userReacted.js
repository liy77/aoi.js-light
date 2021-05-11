module.exports = async d => {
    const code = d.command.code 
    
    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) throw new Error(err)
    
    const fields = inside.splits 
    
    if (fields.length === 3) {
        fields.unshift(d.message.channel.id)
    } 
    
    const [channelID, messageID, userID, reaction] = fields 
    
    if (!reaction) throw new Error(`❌ No emoji provided in \`$userReacted${inside}\``) 
    const channel = d.client.channels.cache.get(channelID) 
    
    if (!channel) throw new Error(`❌ Invalid channel ID in \`$userReacted${inside}\``) 
    
    const m = await channel.messages.fetch(messageID).catch(err => null) 
    
    if (!m) throw new Error(`❌ Invalid message ID in \`$userReacted${inside}\``) 
    
    const emoji = reaction.includes("<") ? reaction.split(":")[2].split(">")[0] : reaction 
    
    const r = m.reactions.cache.get(emoji) 
    
    const users = r ? await r.users.fetch({
        limit: 100
    }).catch(err => null) : undefined 
    
    return {
        code: code.replaceLast(`$userReacted${inside}`, users ? users.has(userID) : false)
    }
}