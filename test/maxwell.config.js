import { returnConfig } from "@maxwellx/context";

export default returnConfig({
    site: {
        title: "张麦麦的博客",
        author: "张麦麦",
    },
    url: {
        url: "http://zhangmaimai.com",
        root: "/",
        permalink: ":year/:month/:day/:title/"
    },
    directory: {
        source: "source",
        public: "public",
        template: "theme"
    },
    renderer: {
        template: "@maxwell/renderer-eta",
        markdown: "@maxwell/renderer-markdown-it"
    },
    template: "default",
    plugins: [
        "maxwell-renderer-pug"
    ]
})