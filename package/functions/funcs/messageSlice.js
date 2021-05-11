module.exports = async d => {
    const code = d.command.code

    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) return throw new Error(err)

    const [
        from, 
        to = d.args.length
    ] = inside.splits

    const x = Number(from), y = Number(to)

    if (!x || !y) return throw new Error(`:x: Invalid number in \`$messageSlice${inside}\``)

    return {
        code: code.replaceLast(`$messageSlice${inside}`, d.args.slice(x, y + 1).join(" ").deleteBrackets())
    }
}