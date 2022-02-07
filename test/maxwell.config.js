import { returnConfig } from "@maxwellx/context";

export default returnConfig({
    site: {
        title: "张麦麦的博客",
        author: "张麦麦",
    },
    url: {
        url: "http://zhangmaimai.com",
        root: "/",
        router: {
            "post": {
                rule: ":year/:month/:day/:filename",
                withIndex: true
            },
            "*": {
                rule: ":layout/:filename",
                withIndex: false
            }
        }
    },
    directory: {
        source: "source",
        public: "public",
        template: "theme"
    },
    renderer: {
        template: "@maxwellx/renderer-eta",
        markdown: "@maxwellx/renderer-markdown-it"
    },
    template: "default",
    plugins: [
        "@maxwellx/renderer-eta",
        "@maxwellx/renderer-markdown-it"
    ]
})