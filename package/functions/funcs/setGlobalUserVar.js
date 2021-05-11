module.exports = async d => {

 const code = d.command.code

 const inside = d.unpack()
	const err = d.inside(inside)

	if (err) return throw new Error(err)

 const [ variable, value, userID = d.message.author.id ] = inside.splits

 if (d.client.variables[variable] === undefined) return throw new Error(`❌ Variable '${variable}' not found`)

 d.client.db.set("main", `${variable}_${userID}`, value)
 
 return {
 code: code.replaceLast(`$setGlobalUserVar${inside}`, "")
 }
}