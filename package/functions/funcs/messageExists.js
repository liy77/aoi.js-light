module.exports = async d => {
    const code = d.command.code 
    
    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) throw new Error(err)
    
    const [channelID, messageID] = inside.splits
    
    const channel = d.client.channels.cache.get(channelID)
    
    if (!channel) throw new Error(`❌ Invalid channel ID in \`$messageExists${inside}\``)
        
    const msg = await channel.messages.fetch(messageID).catch(err => null)

    return {
        code: code.replaceLast(`$messageExists${inside}`, msg ? true : false)
    }
}


