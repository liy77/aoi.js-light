module.exports = d => {
  
  const code = d.command.code
  
  const inside = d.unpack()
	const err = d.inside(inside)

	if (err) throw new Error(err)
  
  const [ text, separator = " " ] = inside.splits
  
  return {
    code: code.replaceLast(`$textSplit${inside}`, ""),
    array: text.deleteBrackets().split(separator) 
  } 
}
