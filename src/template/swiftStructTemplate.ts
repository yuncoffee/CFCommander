import { Variable } from "../types"

// Swift Emun 템플릿
export const SWIFT_ENUM_TEMPLATE = (
    enumName: string = "MyEnum",
    variables: Variable[]
) => {
    let enumCase = ""

    variables.forEach((variable) => {
        enumCase += `\t${variable.name}: ${variable.value}\n`
    })

    return `
enum ${enumName}: ${variables[0].type == "number" ? "CGFloat" : "String"} {
    ${enumCase}
}
    `
}
