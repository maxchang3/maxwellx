import { context, getFilePath, readFileContent } from '@maxwellx/context'
import type { Renderer, withReading } from '.'
import type { PluginType, plugins } from './types'

function definePlugin(instanceList: PluginType[] | PluginType) {
    return instanceList
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
        "maxGenerator": []
    }
    await Promise.all(pluginList.map(async (plugin) => {
        let _pluginInstance: PluginType | PluginType[] = await _loadModule(plugin)
        let _instanceList: PluginType[] = [];
        if (!(_pluginInstance instanceof Array)) {
            _instanceList.push(_pluginInstance)
        } else {
            _instanceList = _pluginInstance
        }
        _instanceList.forEach(_instance => {
            let _unloadType = _instance.constructor.name
            let pluginType: keyof plugins;
            if (_unloadType === "Renderer") {
                if ((_instance as Renderer<withReading>).options) {
                    pluginType = "Renderer<withReading>"
                } else {
                    pluginType = "Renderer<withContent>"
                }
                plugins[pluginType] = _instance
                return;
            }
            pluginType = _unloadType as keyof plugins
            plugins[pluginType].push(_instance)
        })
    }))
    return plugins
}

export { definePlugin, loadPlugin }
