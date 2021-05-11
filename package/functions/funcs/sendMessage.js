const errorHandler = require("../../handlers/errors.js")

module.exports = async d=> {
 
  const code = d.command.code
  
  const inside = d.unpack()
	const err = d.inside(inside)

	if (err) return throw new Error(err)
  
  const fields = inside.splits
  
  if (fields.length < 1) return throw new Error(`❌ Invalid fields in \`$sendMessage${inside}\``)
  
  const returnID = fields.pop()
  
  const msg = fields.join(";")
  
  const m = await errorHandler(d, msg, "object") 
  
  if (!m) return throw new Error(`:x: Could not send message in \`$sendMessage${inside}\``)
  
  return {
    code: code.replaceLast(`$sendMessage${inside}`, returnID === "yes" ? m.id : "") 
  } 
} 
