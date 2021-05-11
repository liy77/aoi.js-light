module.exports = async d => {
    const code = d.command.code

    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) throw new Error(err)

    const [
        number,
        text
    ] = inside.splits

    const n = Number(number)

    if (isNaN(n)) throw new Error(`:x: Invalid number in \`$repeatMessage${inside}\``)

    return{
        code: code.replaceLast(`$repeatMessage${inside}`, text.repeat(n))
    }
}