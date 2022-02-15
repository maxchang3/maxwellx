import type {
    Filter,
    maxGenerator,
    Renderer,
    withContent,
    withReading
} from '.'

interface Injector {

}

type PluginType = Filter | Injector | Renderer<withContent> | Renderer<withReading> | maxGenerator



interface maxPlugin<T extends PluginType> {
    pluginInstance: T
}

// AnyScript!!!!!
interface plugins {
    "Filter": any[],
    "Injector": any[],
    "Renderer<withContent>": any,
    "Renderer<withReading>": any,
    "maxGenerator": any[]
}

export { maxPlugin, PluginType, Filter, plugins }
