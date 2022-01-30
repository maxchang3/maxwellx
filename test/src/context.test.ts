import { readConfig, readPostContext} from "@maxwell-blog/context";



let post = await readPostContext(["source","_posts"],"testpost.md");
console.log(post.frontMatter)
