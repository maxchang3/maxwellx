import type { Router } from "./types";

export class router implements Router {
    rule: string;
    constructor(rule: string, ) {
        this.rule = rule
    }
}