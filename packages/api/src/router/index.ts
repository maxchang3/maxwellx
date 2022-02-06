import dayjs from "dayjs";
import { sep } from "path"
import type { routerKeywords, slugValues } from "./types";
import type { layoutContext } from "@maxwellx/layout"

export class Router {
    #rule: string;
    #layoutContext: layoutContext;
    #routerKeywords: slugValues;
    #slugInRule: string[] = [];
    #withIndex: boolean;
    #staticKeywords: string[] = [":year", ":month", ":day"]

    constructor(rule: string, layoutContext: layoutContext, withIndex: boolean = false) {
        this.#rule = rule
        this.#layoutContext = layoutContext
        this.#routerKeywords = this.#getRouterKeywords()
        this.#parseRouter()
        this.#withIndex = withIndex
    }

    #getRouterKeywords = (): routerKeywords => ({
        ":year": "YYYY",
        ":month": "MM",
        ":day": "DD",
        ":filename": this.#layoutContext.filename,
        ":title": this.#layoutContext.frontMatter.title,
        ":layout": this.#layoutContext.frontMatter.layout
    })
    
    #parseRouter() {
        for (let keyword in this.#routerKeywords) {
            if (!(this.#rule.includes(keyword))) continue
            let key = this.#routerKeywords[keyword]
            if (this.#staticKeywords.includes(keyword)) {
                this.#rule = this.#rule.replaceAll(keyword, key)
            }else{
                this.#rule = this.#rule.replaceAll(keyword, "{slug}")
                this.#slugInRule.push(key)
            }
        }
        if (sep != "/") this.#rule = this.#rule.replaceAll("/", sep)
    }
    format() {
        let _rule = this.#rule.split("{slug}")
        _rule = _rule.map(i => i!="" ? dayjs(this.#layoutContext.frontMatter.date).format(i):"")
        let result = _rule.join("{slug}")
        for (let slug of this.#slugInRule) {
            result = result.replace("{slug}", slug)
        }
        return `${result}${this.#withIndex ? `${sep}index.` : "."}`
    }
}