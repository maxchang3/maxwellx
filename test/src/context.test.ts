import { readConfig, readPostContext} from "@maxwell-blog/context";

let config = await readConfig()
console.log(config)

let post = await readPostContext("source/_posts","testpost.md");
console.log(post.frontMatter)