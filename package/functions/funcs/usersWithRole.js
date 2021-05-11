module.exports = async d => {
    const code = d.command.code

    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) throw new Error(err)

    const options = [
        roleID,
        separator = "\n",
        forceCache = "no"
    ] = inside.splits

    if (forceCache === "yes") {
        if (d.message.guild.memberCount !== d.message.guild.members.cache.size) {
            await d.message.guild.members.fetch()
        }
    }

    const role = d.message.guild.roles.cache.get(roleID)

    if (!role) throw new Error(`:x: Invalid role ID in \`$usersWithRole${inside}\``)

    return {
        code: code.replaceLast(`$usersWithRole${inside}`, role.members.map(m => m.user.tag).join(separator).removeBrackets())
    }
}