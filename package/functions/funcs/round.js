module.exports = async d => {
    const code = d.command.code

    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) return throw new Error(err)

    const n = Number(inside.inside)

    if (isNaN(n)) return throw new Error(`:x: Invalid number in \`$round${inside}\``)

    return {
        code: code.replaceLast(`$round${inside}`, Math.round(n))
    }
}