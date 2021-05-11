module.exports = async d => {
    const code = d.command.code 
    
    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) return throw new Error(err)
    
    return {
        code: code.replaceLast(`$serverEmojiExists${inside}`, d.message.guild ? d.message.guild.emojis.cache.has(inside.inside) : "")
    }
}