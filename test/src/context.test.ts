import { readConfig, readPostContext} from "@maxwellx/context";



let post = await readPostContext(["source","_posts"],"testpost.md");
console.log(post.frontMatter)
