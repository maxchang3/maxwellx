import { returnConfig } from "@maxwellx/context";

export default returnConfig({
    site: {
        title: "张麦麦的博客",
        author: "张麦麦",
    },
    url: {
        url: "http://zhangmaimai.com",
        root: "/",
        permalink: ":year/:month/:day/:filename"
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
        "maxwell-renderer-pug"
    ]
})