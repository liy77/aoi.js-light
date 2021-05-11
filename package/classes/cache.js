const AoiClient = require("./bot");
module.exports = class Cache {
    constructor(options = {}) {
        const cache = options.cache = {};
        const Cache = {
            Guilds: cache.Guilds || true,
            Channels: cache.Channels || true,
            Overwrites: cache.Overwrites || true,
            Roles: cache.Roles || true,
            Emojis: cache.Emojis || true,
            Presences: cache.Presences || true,
        }

        const Bot = new AoiClient({
            token: options.token,
            prefix: options.prefix
        })

        return Bot;
    }
}