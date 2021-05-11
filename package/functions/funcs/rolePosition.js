module.exports = async d => {
    const code = d.command.code

    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) throw new Error(err)

    const role = d.message.guild.roles.cache.get(inside.inside)

    if (!role) throw new Error(`:x: Invalid role ID in \`$rolePosition${inside}\``)

    return {
        code: code.replaceLast(`$rolePosition${inside}`, d.message.guild.roles.cache.size - role.position)
    }
}