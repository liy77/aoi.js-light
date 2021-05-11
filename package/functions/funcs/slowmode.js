const ms = require("ms")

module.exports = async d => {
    const code = d.command.code
    
    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) throw new Error(err)
    
    const [channelID, slowmode] = inside.splits
    
    const channel = d.message.guild.channels.cache.get(channelID)
    
    if (!channel) throw new Error(`❌ Invalid channel ID in \`$slowmode${inside}\``)
        
    const time = slowmode === "0" ? 0 : ms(slowmode)
        
    if (time === undefined) throw new Error(`❌ Invalid time in \`$slowmode${inside}\``)
        
    const ch = await channel.edit({
        rateLimitPerUser: time / 1000
    }).catch(err => {})
    
    if (!ch) throw new Error(`❌ Failed to change slowmode for ${channel.name}`)
        
    return {
        code: code.replaceLast(`$slowmode${inside}`, "")
    }
}

