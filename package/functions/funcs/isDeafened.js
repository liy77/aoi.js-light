module.exports = async d => {
    const code = d.command.code
    
    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) throw new Error(err)
    
    const user = await d.message.guild.members.fetch(inside.inside).catch(err => {})
    
    if (!user) throw new Error(`❌ Invalid user ID in \`$isDeafened${inside}\``)
        
    return {
        code: code.replaceLast(`$isDeafened${inside}`, user.voice.selfDeaf || user.voice.serverDeaf)
    }
}  