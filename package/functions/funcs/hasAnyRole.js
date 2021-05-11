

module.exports = async d => {
    const code = d.command.code

    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) return throw new Error(err)

    const fields = inside.splits

    const userID = (Number(fields[0]) && fields[0].length > 17 && fields[0].length <= 19 && !d.message.guild.roles.cache.get(fields[0] )) ? fields.shift() : d.message.author.id

    const member = await d.message.guild.members.fetch(userID).catch(err => null)

    if (!member) return throw new Error(`❌ Invalid user ID in \`$hasAnyRole${inside}\``)

    const roles = fields 

    if (roles.some(id => d.message.guild.roles.cache.get(id) === undefined)) return throw new Error(`Invalid role ID given in \`$hasAnyRole${inside}\``)

    return {
        code: code.replaceLast(`$hasAnyRole${inside}`, member.roles.cache.some(r => roles.includes(r.id)))
    }
}