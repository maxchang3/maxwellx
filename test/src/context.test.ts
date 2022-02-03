import { readConfig } from "@maxwellx/context";
import { getPostContext } from '@maxwellx/post'


let post = await getPostContext("source", "_posts", "testpost.md");
console.log(post.frontMatter)
