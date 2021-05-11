const channelOptions = require("../../utils/channelOptions") 

module.exports = async d => {
    const code = d.command.code 
    
    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) return throw new Error(err)
    
    const option = Object.keys(channelOptions).find(opt => opt === inside.inside) 
    
    if (!option) return throw new Error(`❌ Invalid option in \`$oldChannel${inside}\``) 
    
    const executor = channelOptions[option].split(";")[1] 
    
    return {
        code: code.replaceLast(`$oldChannel${inside}`, d.data.old_channel ? eval(`d.data.old_channel${executor}`) : "")
    }
}