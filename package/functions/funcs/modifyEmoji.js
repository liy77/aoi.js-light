module.exports = async d => {
 const code = d.command.code 
 
 const inside = d.unpack()
 const err = d.inside(inside)

 if (err) throw new Error(err)
 
 const [emojiID, name, ...roles] = inside.splits
 
 const emoji = d.message.guild.emojis.cache.get(emojiID) 
 
 if (!emoji) throw new Error(`❌ Invalid emoji ID in \`$modifyEmoji${inside}\``) 
 
 const e = await emoji.edit({
 name, 
 roles 
 }).catch(err => null) 
 
 if (!e) throw new Error(`❌ Failed to edit emoji!`)
 
 return {
 code: code.replaceLast(`$modifyEmoji${inside}`, "")
 }
}