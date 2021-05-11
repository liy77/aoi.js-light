module.exports = async (d) => {
  const code = d.command.code;
  const inside = d.unpack();
  const err = d.inside(inside);
  
  if (err) throw new Error(err);

  const ch = d.message.guild.channels.cache.get(inside.inside);

  if (!ch) throw new Error(`:x: Invalid channelID in \`$joinVC${inside}\``);

  if (ch.type !== 'voice') throw new Error(`:x: Specified channel is not a voiceChannel in \`$joinVC${inside}\``);

  const con = await ch.join().catch(d.noop);

  if (!con) throw new Error(`:x: Failed to join voice channel`);

  return {
    code: code.replaceLast(`$joinVC${inside}`, '')
  }
}