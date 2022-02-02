import type { Renderer, withContent, withReading } from './renderer/index.js'

interface Filter {

}

interface Injector {

}

type PluginType = Filter |  Injector | Renderer<withContent> | Renderer<withReading>



interface maxPlugin<T extends PluginType> {
    pluginInstance: T
}


export { maxPlugin, PluginType ,Filter}