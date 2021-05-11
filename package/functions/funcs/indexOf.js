module.exports = async d => {
 const code = d.command.code 
 
 const inside = d.unpack()
	const err = d.inside(inside)

	if (err) throw new Error(err)
 
 const [text, char] = inside.splits
 
 return {
 code: code.replaceLast(`$indexOf${inside}`, text.addBrackets().indexOf(char.addBrackets()) + 1)
 }
}