import { getFilePath, readFileContent } from '@maxwellx/context'
import type { PluginType } from './types'

function definePlugin<T extends PluginType>(instance: T): T {
    return instance
}

async function _getPluginPath(pkg: string) {
    let pkgJSON = JSON.parse(await readFileContent(["node_modules", pkg, "package.json"]))
    return getFilePath("node_modules", pkg, pkgJSON.main)
}

async function loadPluginModule(pkg: string) {
    return (await import(await _getPluginPath(pkg))).default
}

export { definePlugin, loadPluginModule }