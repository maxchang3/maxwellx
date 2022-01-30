# maxwellx
# (WIP)

<img src="./maxwell.png" style="display:block;float:none;margin-left:auto;margin-right:auto;width:60%">


A static site generator (especially blog) using TypeScript for learning purposes.


# Concepts
## renderer
A renderer is an entry to render some files to the target files.

## theme / template
`<layout>.<fileExtension>`: entry file renderer will load in.

Basically, a layout has these default values: `index` for homepage, `post` for post page.