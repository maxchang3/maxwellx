import type { Renderer, withContent, withReading } from './renderer/index.js'

interface Filter {

}

interface Injector {

}

type PluginType = Filter | Injector | Renderer<withContent> | Renderer<withReading> | Generator



interface maxPlugin<T extends PluginType> {
    pluginInstance: T
}

// AnyScript!!!!!
interface plugins {
    "Filter": any[],
    "Injector": any[],
    "Renderer<withContent>": any,
    "Renderer<withReading>": any,
    "Generator": any[]
}

export { maxPlugin, PluginType, Filter, plugins }