module.exports = async d => {
    const code = d.command.code

    const r = code.split("$getObjectProperty").length - 1

    const inside = code.split("$getObjectProperty")[r].after()
	if (!inside.inside) throw new Error(`:x: Invalid usage in $getObjectProperty${inside}`)
    let evaled
    try{
      evaled = eval(`d.object${inside.inside.startsWith('[') ? inside : `.${inside.inside}`}`)
    } catch (err) {
      evaled = null
    }
    return {
        code: code.replaceLast(`$getObjectProperty${inside}`, d.object ? evaled || "" : "")
    }
}