const permissions = require("../../utils/permissions") 

module.exports = async d => {
 const code = d.command.code 
 
 const inside = d.unpack()
 const err = d.inside(inside)

 if (err) return throw new Error(err)
 
 const [roleID, ...pms] = inside.splits
 
 const role = d.message.guild.roles.cache.get(roleID)
 
 if (!role) return throw new Error(`❌ Invalid role ID in \`$modifyRolePerms${inside}\``) 
 
 let total = role.permissions.toArray()
 
 for (const perm of pms) {
 if (perm === "+all") {
 total = ["ADMINISTRATOR"]
 break 
 } else if (perm === "-all") {
 total = [] 
 break 
 }
 const p = permissions[perm.slice(1)] 
 
 if (!p) return throw new Error(`❌ Invalid permission '${perm}' in \`$modifyRolePerms${inside}\``)
 
 if (perm[0] === "+" && !total.includes(p)) {
 total.push(p) 
 } else if (perm[0] === "-") {
 total = total.filter(a => a !== p)
 }
 }
 
 const np = await role.setPermissions(total).catch(err => null) 
 
 if (!np) return throw new Error(`❌ Failed to set role permissions for ${role.name}!`)
 
 return {
 code: code.replaceLast(`$modifyRolePerms${inside}`, "")
 }
}