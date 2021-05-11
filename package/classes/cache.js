const AoiClient = require("./bot");
module.exports = class Cache {
    constructor(options = {}) {
        const cache = options.cache = {};
        const Cache = {
            Guilds: cache.Guilds || true,
            Channels: cache.Channels || false,
            Overwrites: cache.Overwrites || false,
            Roles: cache.Roles || false,
            Emojis: cache.Emojis || false,
            Presences: cache.Presences || false,
        }

        const Bot = new AoiClient({
            token: options.token,
            prefix: options.prefix
        })

        return Bot;
    }
}