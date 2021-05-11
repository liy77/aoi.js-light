module.exports = async d => {
	let code = d.command.code
	
	const r = code.split('$setRoles').length - 1
	const inside = code.split('$setRoles')[r].after()
	
	if (!inside.inside) throw new Error(`:x: Invalid usage in $setRoles${inside.total}`)
	
	const [ userID, ...roles ] = inside.splits
	
	const m = await d.message.guild.members.fetch(userID).catch(err => null)
	
	if (!m) throw new Error(`:x: Invalid userID in \`$setRoles${inside.total}\``)
	
	try {
		await m.roles.set(roles)
	} catch {
		throw new Error(`:x: Failed to set roles to user in \`$setRoles${inside.total}\``)
	}
	
	return {
	 code: code.replaceLast(`$setRoles${inside.total}`, '')
	}
}