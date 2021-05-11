module.exports = async d => {
    const code = d.command.code 
    
    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) return throw new Error(err)
    
    const [channelID, topic = ""] = inside.splits
    
    const channel = d.message.guild.channels.cache. get(channelID) 
    
    if (!channel) return throw new Error(`❌  Invalid channel ID in \`$setChannelTopic${inside}\``) 
    
    const ch = await channel.edit({
        topic: topic.addBrackets()
    }).catch(err => null) 
    
    if (!ch) return throw new Error(`❌ Failed to edit channel topic!`)
    
    return {
        code: code.replaceLast(`$setChannelTopic${inside}`, "")
    }
} 