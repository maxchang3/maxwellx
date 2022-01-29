import { readConfig, readPostContext} from "@maxwell-blog/context";

let config = await readConfig()
console.log(config)

let post = await readPostContext("_posts","testpost.md");
console.log(post.frontMatter)