module.exports = async d => {
    const code =d.command.code

    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) return throw new Error(err)

    const guild = await d.message.guild.edit({
        name: inside.addBrackets()
    }).catch(err => {})

    if (!guild) return throw new Error(`:x: Failed to edit Guild Name!`)

    return {
        code: code.replaceLast(`$setGuildName${inside}`, "")
    }
}//leref is here again