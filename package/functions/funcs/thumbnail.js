module.exports = async d => {
    const code = d.command.code

	if (code.split('$thumbnail').length > 2) return throw new Error(`:x: Cannot use '$thumbnail' more than once`)

    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) return throw new Error(err)
 
    d.embed.setThumbnail(inside.addBrackets() || undefined) 
  
    return { 
      embed: d.embed,
        code: code.replaceLast(`$thumbnail${inside}`, "")
    }
}