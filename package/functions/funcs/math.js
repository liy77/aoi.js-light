const error = require("../../handlers/errors.js")

module.exports = async d => { 
  let code = d.command.code
  
  const r = code.split("$math").length - 1
  
  const inside = code.split("$math")[r].after()

	if (!inside.inside) return throw new Error(`:x: Invalid usage in $math${inside.total}`)

	let result
	
	const OPERATORS = /([0-9]|\/|\+|\*|-|%|<|\(|\)|\[|\]|\.)/g  
	
	try {
	    const operation = inside.inside.match(OPERATORS).join("")
	    
	    if (inside.inside.replace(OPERATORS, "").length) return throw new Error(`❌ Invalid operation in \`$math${inside.total}\``)
	    
  	result = eval(operation)
	} catch {
		return throw new Error(`:x: Failed to calculate in \`$math${inside.total}\``)
	}
  
  return {
   code:d.command.code.replaceLast(`$math${inside.total}`, result)
  }
}