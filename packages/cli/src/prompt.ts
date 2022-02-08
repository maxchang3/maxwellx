import type { QuestionCollection } from "inquirer";

const promptsInit: QuestionCollection = [
    {
        type: "input",
        message: "input your site title: ",
        name: "title",
        default: "Maxwell Site"
    },
    {
        type: "input",
        message: "input your site author name: ",
        name: "author",
        default: "Max"
    },
    {
        type: "confirm",
        message: "use `/` as your site root path? ",
        name: "isRoot",
        default: true
    },
    {
        type: "input",
        message: "input your site root path: ",
        name: "root",
        default: "/",
        when: (answer) => (!(answer.isRoot))
    },
]

export { promptsInit }