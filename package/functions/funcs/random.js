const random = async d => {

    const code = d.command.code

    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) throw new Error(err)

    const [ n1, n2, allow = "no"] = inside.splits

if (inside.splits.length > 3) throw new Error(`❌ Too many fields in \`$random[${inside}]\``)
    if (isNaN(Number(n1)) || isNaN(Number(n2)) || Number(n1) >= Number(n2)) throw new Error(`:x: Invalid number in \`$random[${inside}]\``)

    let n = allow === "yes" ? Math.random() * (Number(n2) - Number(n1)) + Number(n1): Math.round(Math.random() * (Number(n2) - Number(n1))) + Number(n1)

    if (d.randoms[inside]) n = d.randoms[inside]
    else d.randoms[inside] = n

    return {
        code: code.replaceLast(`$random${inside}`, n),
        randoms: d.randoms
    }
}

module.exports = random