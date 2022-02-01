import { readConfig } from "@maxwellx/context";
import { readPostContext } from '@maxwellx/post'


let post = await readPostContext(["source", "_posts"], "testpost.md");
console.log(post.frontMatter)
