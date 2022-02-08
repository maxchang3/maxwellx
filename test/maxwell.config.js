import { returnConfig } from "@maxwellx/context";

export default returnConfig({
    site: {
        title: "Maxwell Static Site Generator",
        author: "Max",
    },
    url: {
        url: "",
        root: "/test/public/",
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
    template: "default",
    plugins: [
        "@maxwellx/renderer-eta",
        "@maxwellx/renderer-markdown-it",
        "@maxwellx/generator-basic",
    ]
})