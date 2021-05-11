module.exports = async d => {
    const code = d.command.code

    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) return throw new Error(err)

    const fields = inside.splits

    const userID = fields.shift()

    const member = await d.message.guild.members.fetch(userID).catch(err => {})

    if (!member) return throw new Error(`:x: invalid user ID in \`$takeRoles${inside}\``)

    const m = await member.roles.remove(fields).catch(Err => {})

    if (!m) return throw new Error(`:x: Failed to remove roles from ${member.user.username}!`)

    return {
        code: code.replaceLast(`$takeRoles${inside}`, "")
    }
}