import { returnConfig } from "@maxwell-blog/context";

export default returnConfig ({
    site: {
        title: "张麦麦的博客",
        author: "张麦麦",
    },
    url: {
        url: "http://zhangmaimai.com",
        root: "/",
        permalink: ":year/:month/:day/:title/"
    },
    directory:{
        source: "source",
        public: "public",
        template: "theme"
    },
    template: "default",
    plugins: [
        "maxwell-renderer-pug"
    ]
})