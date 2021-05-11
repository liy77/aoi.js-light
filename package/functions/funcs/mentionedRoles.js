const mentionedRoles = d => {
  
  let code = d.command.code
  
  const inside = d.unpack()
  const err = d.inside(inside)

  if (err) throw new Error(err)
  
  const mention = inside.inside
  
  if (isNaN(mention)) throw new Error(`❌ Invalid mention number in \`$mentionedRoles${inside}\``)
  
  const role = d.message.mentions.roles.array()[Number(mention) - 1]
  
  return {
    code: code.replaceLast(`$mentionedRoles${inside}`, role ? role.id : "") 
  } 
}

module.exports = mentionedRoles 