import path from "path";
const __dirname = process.cwd();
const configPath = path.join(__dirname, 'maxwell.config.js');
async function readConfig() {
    let config = (await import(configPath)).default;
    return config;
}
async function readMarkdownFrontMatter() {
}
export { readConfig };
//# sourceMappingURL=index.js.map