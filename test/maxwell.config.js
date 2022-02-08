import { returnConfig } from "@maxwellx/context";
export default returnConfig({
	"site": {
		"title": "Maxwell Blog",
		"author": "Maxwell"
	},
	"url": {
		"url": "",
		"root": "/",
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
	"directory": {
		"source": "source",
		"public": "public",
		"template": "theme"
	},
	"template": "default",
	"plugins": [
		"@maxwellx/renderer-eta",
		"@maxwellx/renderer-markdown-it",
		"@maxwellx/generator-basic"
	]
})
