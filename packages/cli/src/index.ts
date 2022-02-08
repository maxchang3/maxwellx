#!/usr/bin/env node
import { logger, defaultConfig, writeFile, configure } from '@maxwellx/context'
import { promptsInit } from './prompt.js'
import { maxwell } from '@maxwellx/core'
import { Command } from 'commander'
import inquirer from 'inquirer'
const program = new Command();
const core = new maxwell();

program.addHelpText('beforeAll', `                
███╗   ███╗ █████╗ ██╗  ██╗██╗    ██╗███████╗██╗     ██╗     ██╗  ██╗
████╗ ████║██╔══██╗╚██╗██╔╝██║    ██║██╔════╝██║     ██║     ╚██╗██╔╝
██╔████╔██║███████║ ╚███╔╝ ██║ █╗ ██║█████╗  ██║     ██║      ╚███╔╝ 
██║╚██╔╝██║██╔══██║ ██╔██╗ ██║███╗██║██╔══╝  ██║     ██║      ██╔██╗ 
██║ ╚═╝ ██║██║  ██║██╔╝ ██╗╚███╔███╔╝███████╗███████╗███████╗██╔╝ ██╗
╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚══╝╚══╝ ╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝             
`)

const getPerf = async (callback: () => Promise<void>) => {
    let _start = performance.now()
    await callback()
    let _end = performance.now()
    return _end - _start
}

const getConfig = (outputConfig: configure) => `import { returnConfig } from "@maxwellx/context";\nexport default returnConfig(${JSON.stringify(outputConfig, null, "\t")})\n`

program
    .name('maxwellx')
    .description('cli for maxwellx static site generator')
    .version("1.0.0");

program.command('generate')
    .alias('g')
    .description('generate site from your source file')
    .action(async () => {
        getPerf(async () => {
            logger.info("loading files and configs…")
            await core.init()
            logger.info("rendering source file with templates…")
            await core.render()
            logger.info("writing…")
            await core.write()
        }).then((time) => {
            logger.sucesss(`Generate Success! Time used: ${Math.round(time)} ms`)
        }).catch((error) => {
            logger.error(error)
        })
    });

program.command('init')
    .description("init your blog with an empty folder, skip all with `-y`")
    .option('-y', 'skip all questions use default value')
    .action(async (options) => {
        // Todo: clone template repo to the folder exec `<packageManager> install`
        let outputConfig = defaultConfig
        if (!(options.y)) {
            const answers = await inquirer.prompt(promptsInit)
            outputConfig.site.title = answers.title
            outputConfig.site.author = answers.author
            outputConfig.url.root = answers.isRoot ? "/" : answers.root
        }
        writeFile(["maxwell.config.js"], getConfig(outputConfig))
            .then(() => {
                logger.sucesss("init success!")
            }).catch((error) => {
                logger.error(error)
            })
    })

program.command('new')
    .alias('n')
    .description("create .md files in your source folder")
    .argument('<title>', 'filename')
    .argument('[layout]', 'layout', "post")
    .action(async (title, layout) => {
        const template = `---\ntitle: ${title}\ndate: ${new Date().toISOString()}\ndescription: ''\n---`
        logger.info("loading config…")
        await core.setConfig()
        writeFile([core.context.config.directory.source, layout, `${title}.md`], template)
            .then((filename) => {
                logger.sucesss(`Created: \x1B[36m${filename}`)
            }).catch((error) => {
                logger.error(error)
            })
    })
program.parse();