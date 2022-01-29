export default {
    site: {
        title: "张麦麦的博客",
        author: "张麦麦",
    },
    url: {
        url: "http://zhangmaimai.com",
        root: "/",
        permalink: ":year/:month/:day/:title/"
    },
    template: "default",
    plugins: [
        "maxwell-renderer-pug"
    ]
}