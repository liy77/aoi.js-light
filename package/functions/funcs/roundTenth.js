module.exports = async d => {
    const code = d.command.code

    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) throw new Error(err)

    const n = Number(inside.splits[0])

    const to = Number(inside.splits[1])

    if (!n || !to) throw new Error(`:x: Invalid number in \`$roundTenth${inside}\``)

    return {
        code: code.replaceLast(`$roundTenth${inside}`, n.toFixed(to))
    }
}