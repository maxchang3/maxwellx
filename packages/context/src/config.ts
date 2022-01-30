import { configPath } from "./utils.js";
import { configure } from "./types";

async function readConfig() {
    let config = (await import(configPath)).default
    return config
}

function returnConfig(config:configure):configure {
    return config
}


export { readConfig,returnConfig}