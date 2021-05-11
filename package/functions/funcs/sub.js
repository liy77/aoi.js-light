const sub = async d => {

    const code = d.command.code

    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) throw new Error(err)

    const fields = inside.splits

    if (fields.some(n => isNaN(Number(n)))) throw new Error(`:x: Invalid number in \`$sub${inside}\``)

    const n = fields.reduce((x, y) => Number(x) - Number(y))

    return {
        code: code.replaceLast(`$sub${inside}`, n)
    }
}

module.exports = sub