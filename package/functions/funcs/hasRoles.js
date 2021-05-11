module.exports = async d => {
    const code = d.command.code

    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) return throw new Error(err)

    const fields = inside.splits

    const userID = fields.shift()

    const member = await d.message.guild.members.fetch(userID).catch(Err => {})

    if (!member) return throw new Error(`:x: Invalid user ID in \`$hasRoles${inside}\``)

    return {
        code: code.replaceLast(`$hasRoles${inside}`, fields.every(id => member.roles.cache.has(id)))
    }
}