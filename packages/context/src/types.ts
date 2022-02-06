interface readFileOptions {
    encoding?: BufferEncoding,
    escape?: boolean
}
interface configure {
    /** site information */
    site: {
        /** site title */
        title: string,
        /** the author's name will show in the post */
        author: string,
    },
    /** site url configure */
    url: {
        /** site url such as https://example.com */
        url: string,
        /** site root path, if your site in a subdirectory such as `/blog/` just set it to `blog`   */
        root: string,
        /** site url route link  */
        router: {
            /**  the rule of the `layout` you want to define. `*` means for all layout */
            [key: string]: {
                /** url route rule for `layout`
                  * slug list :
                  * 
                  * `:year` `:month` `:day`  the times in markdown frontmatter
                  * 
                  * `:title`  the title in markdown frontmatter
                  * 
                  * `:filename`  the filename of the markdown file
                  * 
                  * You can use <constant> to pass in a constant,
                  * e.g. `<post>` will eventually be rendered as `post`
                  * 
                */
                rule: string,
                /** when this option set to `true` generate an index.html finally, 
                 * in this way, your route name will be the folder name 
                 * otherwise, your route name will be the filename name 
                 * */
                withIndex: boolean
            }
        }
    },
    /** site directory */
    directory: {
        /** source file (mostly markdown) directroty */
        source: string,
        /** public dir to generate to */
        public: string,
        /** template dir */
        template: string
    },
    /** engine to render your source file */
    renderer: {
        /** template renderer */
        template: string,
        /** markdown renderer */
        markdown: string
    },
    /** template name */
    template: string,
    /** plugins */
    plugins: string[]
}
interface context {
    config: configure,
    [key: string]: any
}


export { readFileOptions, configure, context }
