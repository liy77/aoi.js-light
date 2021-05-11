const setMessageVar = async d => {

 const code = d.command.code

 const inside = d.unpack()
	const err = d.inside(inside)

	if (err) throw new Error(err)

 const [ variable, value, messageID = d.message.id ] = inside.splits

 if (d.client.variables[variable] === undefined) throw new Error(`❌ Variable '${variable}' not found`)

 
 d.client.db.set("main", `${variable}_${messageID}`, value)
 
 
 

 return {
 code: code.replaceLast(`$setMessageVar${inside}`, "")
 }
}

module.exports = setMessageVar