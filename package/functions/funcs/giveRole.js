module.exports = async d => {
    const code = d.command.code 
    
    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) return throw new Error(err)
    
    const [userID, roleID] = inside.splits
    
    const s = await d.client.api.guilds(d.message.guild.id).members(userID).roles(roleID).put().catch(err => null)
    
    if (!s) return throw new Error(`❌ Failed to give role! `) 
    
    return {
        code: code.replaceLast(`$giveRole${inside}`, "")
    }
}
