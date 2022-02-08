import { Command } from 'commander'
import inquirer from 'inquirer'
import { maxwell } from '@maxwellx/core'
import { logger, defaultConfig, writeFile } from '@maxwellx/context'

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
program
    .name('maxwellx')
    .description('cli for maxwellx static site generator')
    .version("1.0.0");

program.command('split')
    .description('Split a string into substrings and display as an array')
    .argument('<string>', 'string to split')
    .option('--first', 'display just the first substring')
    .option('-s, --separator <char>', 'separator character', ',')
    .action((str, options) => {
        const limit = options.first ? 1 : undefined;
        console.log(str.split(options.separator, limit));
    });

program.command('generate')
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
    .description("init your blog with an empty folder")
    .option('-y', 'skip all questions use default value')
    .action(async (options) => {
        let outputConfig = defaultConfig
        if (!(options.y)) {
            const answers = await inquirer.prompt([
                {
                    type: "input",
                    message: "input your site title: ",
                    name: "title",
                    default: "Maxwell Site"
                },
                {
                    type: "input",
                    message: "input your site author name: ",
                    name: "author",
                    default: "Max"
                },
                {
                    type: "confirm",
                    message: "use `/` as your site root path? ",
                    name: "isRoot",
                    default: true
                },
                {
                    type: "input",
                    message: "input your site root path: ",
                    name: "root",
                    default: "/",
                    when: (answer) => (!(answer.isRoot))
                },
            ])

            outputConfig.site.title = answers.title
            outputConfig.site.author = answers.author
            outputConfig.url.root = answers.isRoot ? "/" : answers.root
        }
        let configString = `import { returnConfig } from "@maxwellx/context";\nexport default returnConfig(${JSON.stringify(outputConfig, null, "\t")})\n`
        writeFile(["maxwell.config.js"], configString)
            .then(() => {
                logger.sucesss("init success!")
            }).catch((error) => {
                logger.error(error)
            })
    })


program.parse();