import { configPath } from "./utils.js";
import { configure  } from "./types";

const defaultConfig:configure = {
    site: {
        title: "Maxwell Blog",
        author: "Maxwell",
    },
    url: {
        url: "",
        root: "/",
        router: {
            "post": {
                rule: ":year/:month/:day/:filename",
                withIndex: true
            },
            "*": {
                rule: ":layout/:filename",
                withIndex: true
            }
        }
    },
    directory: {
        source: "source",
        public: "public",
        template: "template"
    },
    template: "default",
    plugins: [
        "@maxwellx/renderer-eta",
        "@maxwellx/renderer-markdown-it",
        "@maxwellx/generator-basic"
    ]
}

async function readConfig() :Promise<configure>{
    let config:Partial<configure> = (await import(configPath)).default
    return getSafeConfig(config)
}

function returnConfig(config:Partial<configure>):Partial<configure> {
    return config
}

function getSafeConfig(config:Partial<configure>):configure{
    config.site ??= defaultConfig.site
    config.site.title ??= defaultConfig.site.title
    config.site.author ??= defaultConfig.site.author

    config.url ??= defaultConfig.url
    config.url.url ??= defaultConfig.url.url
    config.url.root ??= defaultConfig.url.root

    config.url.router ??= defaultConfig.url.router
    config.url.router.post ??= defaultConfig.url.router.post
    config.url.router["*"] ??= defaultConfig.url.router["*"]

    config.directory  ??= defaultConfig.directory
    config.directory.source ??= defaultConfig.directory.source
    config.directory.public ??= defaultConfig.directory.public
    config.directory.template ??= defaultConfig.directory.template

    config.template ??= defaultConfig.template
    config.plugins ??= defaultConfig.plugins

    return config as configure
}

export { readConfig,returnConfig,defaultConfig}
