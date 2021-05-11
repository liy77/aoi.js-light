module.exports = async d => {
    const code = d.command.code 
    
    const inside = d.unpack()
    
    if (inside.inside) {
        const [channelID, messageID] = inside.splits
        
        const channel = d.message.guild.channels.cache.get(channelID) 
        
        if (!channel) return throw new Error(`❌ Invalid channel ID in \`$unpinMessage${inside}\``) 
        
        const msg = await channel.messages.fetch(messageID).catch(err => null) 
        
        if (!msg) return throw new Error(`❌ Invalid message ID in \`$unpinMessage${inside}\``) 
        
        const m = await msg.unpin().catch(err => null) 
        
        if (!m) return throw new Error(`:x: Failed to unpin message`)
        
        return {
            code: code.replaceLast(`$unpinMessage${inside}`, "")
        }
    } else {
        const m = await d.message.unpin().catch(err => null) 
        
        if (!m) return throw new Error(`❌ Failed to unpin message`)
        
        return {
            code: code.replaceLast(`$unpinMessage`, "")
        }
    }
}