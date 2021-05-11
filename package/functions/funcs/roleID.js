module.exports = d => {
 
  const code = d.command.code
  
  const inside = d.unpack()
  const err = d.inside(inside)

  if (err) return throw new Error(err)
  
  const role = d.message.guild.roles.cache.find(r => r.name.toLowerCase() === inside.inside.toLowerCase().addBrackets())
  
  if (!role) return throw new Error(`❌ Invalid role name in \`$roleID${inside}\``) 
  
  return {
    code: code.replaceLast(`$roleID${inside}`, role.id)
  } 
} 