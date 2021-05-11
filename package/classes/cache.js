module.exports = class Cache {
    constructor(cache = {}) {
        return {
            Guilds: cache.Guilds || true,
            Channels: cache.Channels || false,
            Overwrites: cache.Overwrites || false,
            Roles: cache.Roles || false,
            Emojis: cache.Emojis || false,
            Presences: cache.Presences || false,
            Bot = require('./bot')(Guilds, Channels, Overwrites, Roles, Emojis, Presences)
        }
    }
}