import type { PluginType } from './types'

function definePlugin<T extends PluginType>(instance:T):T{
    return instance
}

export { definePlugin }