const axios = require('axios');

module.exports = async d => {
	const code = d.command.code;

	const inside = d.unpack()
	const err = d.inside(inside)

	if (err) throw new Error(err)
	
	let bool = await axios.get(inside.inside.addBrackets()).catch(err => null) 
	
	return {
	    code: code.replaceLast(`$isValidLink${inside}`, bool ? true : false)
	}
};
