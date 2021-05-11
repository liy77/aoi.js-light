module.exports = async d => {
    const code = d.command.code
    
    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) throw new Error(err)
    
    const [channelID, messageID, emoji] = inside.splits
    
    const channel = d.client.channels.cache.get(channelID) 
    
    if (!channel) throw new Error(`❌ Invalid channel ID in \`$reactionCount${inside}\``) 
    
    const msg = await channel.messages.fetch(messageID).catch(err => null) 
    
    if (!msg) throw new Error(`❌ Invalid message ID in \`$reactionCount${inside}\``) 
    
    const reaction = msg.reactions.cache.get(emoji.addBrackets().includes("<") ? emoji.addBrackets().split(":")[2].split(">")[0] : emoji)
    
    return {
        code: code.replaceLast(`$reactionCount${inside}`, reaction ? reaction.count : 0)
    }
}