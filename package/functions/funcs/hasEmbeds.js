module.exports = async d => {
    const code = d.command.code 
    
    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) throw new Error(err)

    const [channelID, messageID] = inside.splits
    
    const channel = d.client.channels.cache.get(channelID)
    
    if (!channel) throw new Error(`❌ Invalid channel ID in \`$hasEmbeds${inside}\``)
        
    const msg = await channel.messages.fetch(messageID).catch(err => null)
        
    if (!msg) throw new Error(`❌ Invalid message ID in \`$hasEmbeds${inside}\``)
         
    return {
        code: code.replaceLast(`$hasEmbeds${inside}`, msg.embeds[0] ? true : false)
    }
}


 