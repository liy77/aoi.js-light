module.exports = async d => {
    const code = d.command.code
    
    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) return throw new Error(err)
    
    const b = await d.client.user.setAvatar(inside.addBrackets()).catch(err => {})
    
    if (!b) return throw new Error(`❌ Failed to change bot avatar`)
        
    return {
        code: code.replaceLast(`$setBotAvatar${inside}`,"")
    }
}  