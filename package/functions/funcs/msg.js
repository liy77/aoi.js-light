const moment = require("moment");

module.exports = async d => {
    let code = d.command.code

    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) throw new Error(err)
 
    let [channelID, messageID, option] = inside.splits
    
    let channel = d.client.channels.cache.get(channelID)
    
    if (!channel) throw new Error(`:x: Invalid channel ID in 1st field of \`$msg${inside}\`.`)
    


    // if(!message) 

 let result = option.toLowerCase()

 if (!result && (option != "isdeleted")) result = undefined

 if(!result)  throw new Error(`:x: Missing option in 3rd field of \`$msg${inside}\`.`)
 if(![
    "author",
    "authormention",
    "authortag",
    "authorname",
    "channelid",
    "channelname",
    "channelmention",
    "nomentioncontent",
    "content",
    "created",
    "guildid",
    "id",
    "isdeletable",
    "isdeleted",
    "iseditable",
    "ispinnable",
    "ispinned",
    "cleancontent",
    "guildname",
    "url"
].includes(result.toLowerCase())) throw new Error(`:x: Invalid option in 3rd field of \`$msg${inside}\`.`)


try {
    let message = await d.channel.messages.fetch(messageID) 

    switch(result) {
        case "author": result = message.author;
            break;
        case "authormention": result = message.author.toString(messageID);
            break;
        case "authorname": result = message.author.username;
            break;
        case "authortag" : result = message.author.tag;
            break;
        case "channelid": result = message.channel;
            break;
        case "channelname": result = message.channel.name;
            break;
        case "channelmention": result = message.channel.toString(channel);
            break;
        case "nomentioncontent": result = message.cleanContent;
            break;
        case "content": result = message.content;
            break;
        case "created": result = moment(message.createdAt).format("LLLL");
            break;
        case "guildid": result = message.guild;
            break;
        case "id": result = message.id;
            break;
        case "isdeletable": result = message.deletable;
            break;
        case "isdeleted": result = message.deleted;
            break;
        case "iseditable": result = message.editable;
            break;
        case "ispinnable": result = message.pinnable;
            break;
        case "ispinned": result = message.pinned;
            break;
        case "cleancontent": result = message.cleanContent.split('@').join('');
            break;
        case "guildname": result = message.guild.name;
            break;
        case "url": result = message.url;
            break;
    
            default: undefined
            break;
        };
    
} catch {
throw new Error(`:x: Invalid message ID in 2nd field of \`$msg${inside}\``)
}


    // if (!result) result = "undefined";

    return {
        code: code.replaceLast(`$msg${inside}`, result)
    }
}