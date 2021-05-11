const userOptions = require("../../utils/userOptions") 

module.exports = async d => {
    const code = d.command.code 
    
    const inside = d.unpack() 
	const err = d.inside(inside)

	if (err) throw new Error(err)
    
    const option = Object.keys(userOptions).find(opt => opt === inside.inside) 
    
    if (!option) throw new Error(`❌ Invalid option in \`$oldUser${inside}\``) 
    
    const executor = userOptions[option].split(";")[1] 
    
    return {
        code: code.replaceLast(`$oldUser${inside}`, d.data.user ? eval(`d.data.user${executor}`) : "")
    }
}