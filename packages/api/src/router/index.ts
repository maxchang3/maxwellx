import dayjs from "dayjs";
import { sep } from "path"
import type { routerFunc, routerKeywords, slugValues } from "./types";
import type { pageContext } from "@maxwellx/layout"
import type { context } from "@maxwellx/context";

class RouterPlugin {
    layout: string;
    #routerFunc: routerFunc;
    constructor(layout: string, routerFunc: routerFunc) {
        this.layout = layout
        this.#routerFunc = routerFunc
    }
    getRouter(context: context) {
        let routerData = this.#routerFunc(context)
        return new Router(routerData.router.rule, context.pageContext, routerData.router.withIndex)
    }
}
export class Router {
    #rule: string;
    #pageContext: pageContext;
    #routerKeywords: slugValues;
    #withIndex: boolean;
    #staticKeywords: string[] = [":year", ":month", ":day"]

    constructor(rule: string, pageContext: pageContext, withIndex: boolean = false) {
        this.#rule = rule
        this.#pageContext = pageContext
        this.#routerKeywords = this.#getRouterKeywords()
        this.#parseRouter()
        this.#withIndex = withIndex
    }

    #getRouterKeywords = (): routerKeywords => ({
        ":year": "YYYY",
        ":month": "MM",
        ":day": "DD",
        ":filename": this.#pageContext.filename,
        ":title": this.#pageContext.frontMatter.title,
        ":layout": this.#pageContext.frontMatter.layout
    })

    #parseRouter() {
        for (let keyword in this.#routerKeywords) {
            if (!(this.#rule.includes(keyword))) continue
            let key = this.#routerKeywords[keyword]
            if (this.#staticKeywords.includes(keyword)) {
                this.#rule = this.#rule.replaceAll(keyword, key)
            } else {
                this.#rule = this.#rule.replaceAll(keyword, `<${key}>`)
            }
        }
        if (sep != "/") this.#rule = this.#rule.replaceAll("/", sep)
    }

    format() {
        let dayjsRules = this.#rule.split(/<[^>]*>/g).filter(rule => rule != '')
        dayjsRules = dayjsRules.map(i => i != "" ? dayjs(this.#pageContext.frontMatter.date).format(i) : "")
        let buildInRules = (this.#rule.match(/<[^>]*>/g) || []).filter(rule => rule != '')
        buildInRules = buildInRules.map(rule => rule.replaceAll("<", "").replaceAll(">", ""))
        let firstRules: string[], secondRules: string[]
        if (/<[^>]*>/.exec(this.#rule)?.index != 0) {
            firstRules = dayjsRules
            secondRules = buildInRules
        } else {
            firstRules = buildInRules
            secondRules = dayjsRules
        }
        let _rules: string[] = []
        firstRules.forEach((rule, index) => {
            _rules.push(rule)
            let _rule_second = secondRules[index]
            if (_rule_second) _rules.push(_rule_second)
        })
        let result = _rules.join("")
        return `${result}${this.#withIndex ? `${sep}index.` : "."}`
    }
}