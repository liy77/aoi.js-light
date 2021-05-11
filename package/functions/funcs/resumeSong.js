module.exports = async d => {
    const code = d.command.code

    const server = d.client.servers.get(d.message.guild.id)

    if(!server) throw new Error(`:x: Nothing being played!`)

    server.connection.dispatcher.resume(true)

    d.client.servers.set(d.message.guild.id, server)

    return {
        code: d.command.code.replaceLast(`$resumeSong`, "")
    }
}