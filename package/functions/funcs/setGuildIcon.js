module.exports = async d => {
    const code =d.command.code

    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) throw new Error(err)

    const guild = await d.message.guild.edit({
        icon: inside.addBrackets()
    }).catch(err => {})

    if (!guild) throw new Error(`:x: Failed to edit Guild Icon!`)

    return {
        code: code.replaceLast(`$setGuildIcon${inside}`, "")
    }
}//leref here