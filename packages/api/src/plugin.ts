import { context, getFilePath, getFiles, readFileContent } from '@maxwellx/context'
import { Renderer,  withReading } from '.'
import type { PluginType, plugins } from './types'

function definePlugin<T extends PluginType>(instance: T): T {
    return instance
}

async function _getPluginPath(pkg: string) {
    let pkgJSON = JSON.parse(await readFileContent(["node_modules", pkg, "package.json"]))
    return getFilePath("node_modules", pkg, pkgJSON.main)
}

async function _loadModule(pkg: string) {
    return (await import(await _getPluginPath(pkg))).default
}

async function loadPlugin(context: context) {
    let pluginList = context.config.plugins
    const plugins: plugins = {
        "Filter": [],
        "Injector": [],
        "Renderer<withContent>": "",
        "Renderer<withReading>": "",
        "Generator": []
    }
    await Promise.all(pluginList.map(async (plugin) => {
        let _pluginInstance = await _loadModule(plugin)
        let _unloadType = _pluginInstance.constructor.name
        let pluginType: keyof plugins;
        if (_unloadType === "Renderer") {
            if ((_pluginInstance as Renderer<withReading>).options) {
                pluginType = "Renderer<withReading>"
            } else {
                pluginType = "Renderer<withContent>"
            }
            plugins[pluginType] = _pluginInstance
            return;
        }
        pluginType = _unloadType
        plugins[pluginType].push(_pluginInstance)
    }))
    return plugins
}

export { definePlugin , loadPlugin }