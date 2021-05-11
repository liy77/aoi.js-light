//your bad ofc
//ill just make it here
//module.export = ruben d => robot 
//const code = d.robot.p
//const r = code.dead;
module.exports = async d => {
  const code = d.command.code
  
  const inside = d.unpack()
  const err = d.inside(inside)

  if (err) throw new Error(err)
  
  const [
    userID,
    reason
  ] = inside.splits
  
  const member = await d.message.guild.members.fetch(userID).catch(err => null)
  
  if (!member || typeof member.kick === "undefined") throw new Error(`:x: Invalid user ID in \`$kick${inside}\``)
  
  const m = await member.kick(reason).catch(err => {})
  
  if (!m) throw new Error(`:x: Failed to kick ${member.user.username}!`)
  
  return {
    code: code.replaceLast(`$kick${inside}`, "")
  }
}