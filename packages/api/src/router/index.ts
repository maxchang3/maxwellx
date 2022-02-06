import dayjs from "dayjs";
import { sep } from "path"
import type { routerKeywords, slugValues } from "./types";
import type { layoutContext } from "@maxwellx/layout"

export class Router {
    #rule: string;
    #layoutContext: layoutContext;
    #routerKeywords: slugValues;
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
            } else {
                this.#rule = this.#rule.replaceAll(keyword, `<${key}>`)
            }
        }
        if (sep != "/") this.#rule = this.#rule.replaceAll("/", sep)
    }

    format() {
        let dayjsRules = this.#rule.split(/<[^>]*>/g).filter(rule=>rule!='')
        dayjsRules = dayjsRules.map(i => i != "" ? dayjs(this.#layoutContext.frontMatter.date).format(i) : "")
        let buildInRules = (this.#rule.match(/<[^>]*>/g) || []).filter(rule=>rule!='')
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