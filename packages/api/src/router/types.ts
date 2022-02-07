import type{ context } from "@maxwellx/context"

interface slugValues {
    [key: string]:  string 
}

interface routerKeywords {
    [key: string]:  string
}

interface routerData {
    router:{
        rule: string;
        withIndex: boolean;
    },
    routerKeywords:routerKeywords,
}
type routerFunc =  (context:context) =>  routerData

export { routerKeywords, slugValues , routerFunc }