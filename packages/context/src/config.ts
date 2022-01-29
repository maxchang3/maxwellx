import { configPath } from "./utils.js";

async function readConfig() {
    let config = (await import(configPath)).default
    return config
}

export { readConfig }