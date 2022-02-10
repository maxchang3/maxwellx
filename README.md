# maxwellx
# (WIP)
<p align="center">
<img src="./maxwell.png" style="width:40%; height:40%">
</p>

A static site generator base on TypeScript for learning purposes.  

基于 TypeScript 的静态站点生成器。

（为学习目的开发，目前仍然 WIP）

**Inspired and borrowed from hexo.**

受 Hexo 启发，许多东西借鉴自他。

# 快速上手
```markdown
# npm包暂未发布
pnpm i @maxwellx/cli --global
# npm 包发布后会增加自动安装
maxwellx init
maxwellx n "test-post"
maxwellx g
```
你将会得到一个默认配置文件。 默认的目录结构如下

```
.
├── maxwell.config.js
├── package.json
├── themes
├── source
|   └── post
└── theme
```

你可以在 source/post 文件夹下书写你的 markdown 文件。

theme 下是所有的主题目录。

网站的配置信息可以参考 [配置文件](/2022/02/09/config/)。

# 概念介绍

## layout
layout 是一个页面的基本样式。如果你在 markdown 的 frontmatter 中传入 layout 值，那么在渲染过程中他将会自动寻找 `layout.<模版引擎文件后缀>` 来进行渲染。 同时，layout 的值也会传入路由中来进行路径的构建。

另外，在默认的源文件目录 `source` 中，每个文件夹代表了其所属的 layout。如果你在 `post` 文件夹下的文件微设置 layout 项，将会默认按其文件夹名称为其 layout 即 layout 为 `post`。

## 路由规则
路由规则是 MaxwellX 中非常重要的一环，他承载着将渲染文件根据对应规则写入到对应目录到职能。在 @maxwellx/core 中 通过调用 @maxwellx/router 对其传入上下文中配置文件的路由项来获取对应路由。

以下是默认配置文件的片段：
```javascript
"url": {
	"url": "",
	"root": "/test/public/",
	"router": {
		"post": {
			"rule": ":year/:month/:day/:filename",
			"withIndex": true
		},
		"*": {
			"rule": ":layout/:filename",
			"withIndex": true
		}
	}
},	
```

默认路由实现了对 post 即文章/帖子根据时间规则写入到根目录与任意样式文件根据其样式名写入到对应文件夹的功能。

路由的规则表如下：
| slug        | 说明     |
| ----------- | -------- |
| `:year`     | 年       |
| `:month`    | 月       |
| `:day`      | 日       |
| `:title`    | 文章标题 |
| `:filename` | 文件名   |

你可以使用 `<常量>` 来传入一个常量，例如你想将文章放在 `post` 目录下，则使用 `<post>`。

## 自定义界面
你可以通过编写 Generator 插件来自定义页面。 
MaxwellX 中的首页实即使用 Generator 实现。

我们可以看下他的基本结构：

```typescript
// 首先，你需要引入 definePlugin 方法与 maxGenerator 类。
import { definePlugin, maxGenerator } from "@maxwellx/api";
// 以下是类型引入
import type { generatorConfig } from "@maxwellx/api"
import type { filesContext, frontMatter } from "@maxwellx/layout"

type postList = frontMatter[]

// 新建一个实例
const basicGenerator = new maxGenerator(async (context) => {
	// 我们会在这里拿到 context，即上下文。
	// 上下文中包括了所有文件的信息，因此你可以通过传递一个 postList 的方式来配合模版实现首页显示文章。
    const filesContext: filesContext = context.filesContext
    const postList: postList = filesContext.map(file => {
        file.frontMatter.filename = file.filename
        return file.frontMatter
    })
	// 或许你这里能看出来 Generator 的本质即虚构一个页面
	// 这个页面不依赖于源文件而在此独自生成，并可以传入自定义数据。
	// 当然，你也可以通过自定义 layout 的方式来实现首页，在上面的 Router 中 已经说明。
    const config: generatorConfig = {
        filename: "index.html",
        data: {
            postList
        },
        layout: "index"
    }
    return config
})

export default definePlugin(basicGenerator)
```
