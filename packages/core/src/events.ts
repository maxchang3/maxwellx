import { EventEmitter } from "events";
import type { filter } from "@maxwellx/api";
import type { pageContext } from "@maxwellx/layout";

export class maxEvent {
    private static instance: maxEvent;
    private event: EventEmitter;
    constructor(event: EventEmitter) {
        this.event = event
    }
    public static getEvent() {
        if (!(maxEvent.instance)) maxEvent.instance = new maxEvent(new EventEmitter())
        return maxEvent.instance
    }
    on(type: filter, func: (...args: any[]) => void) {
        return this.event.on(type, func)
    }
    emit(type: filter, pageContext: pageContext) {
        return this.event.emit(type, pageContext)
    }

}
