const permissions = require("../../utils/permissions.js")

module.exports = async d => {
    const code = d.command.code

    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) throw new Error(err)

    const fields = inside.splits
    const userID = fields.shift()

    const member = await d.message.guild.members.fetch(userID).catch(err => {})

    if (!member) throw new Error(`:x: Invalid user ID in \`$hasPerms${inside}\``)

    const reqPerms = []

    for (const field of fields) {
        const perm = permissions[field]

        if (!perm) throw new Error(`:x: Invalid perm '${field}' in \`$hasPerms${inside}\``)

        else reqPerms.push(perm)
    } 

    return {
        code: code.replaceLast(`$hasPerms${inside}`, member.hasPermission(reqPerms))
    }
}