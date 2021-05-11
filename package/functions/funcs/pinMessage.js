module.exports = async d => {
    const code = d.command.code 
    
    const inside = d.unpack() 
    
    if (inside.inside) {
        const [channelID, messageID] = inside.splits
        
        const channel = d.message.guild.channels.cache.get(channelID) 
        
        if (!channel) throw new Error(`❌ Invalid channel ID in \`$pinMessage${inside}\``) 
        
        const msg = await channel.messages.fetch(messageID).catch(err => null) 
        
        if (!msg) throw new Error(`❌ Invalid message ID in \`$pinMessage${inside}\``) 
        
        const m = await msg.pin().catch(err => null) 
        
        if (!m) throw new Error(`Failed to pin message`)
        
        return {
            code: code.replaceLast(`$pinMessage${inside}`, "")
        }
    } else {
        const m = await d.message.pin().catch(err => null) 
        
        if (!m) throw new Error(`❌ Failed to pin message`)
        
        return {
            code: code.replaceLast(`$pinMessage`, "")
        }
    }
}