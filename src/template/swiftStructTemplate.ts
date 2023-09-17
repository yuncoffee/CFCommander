import { Variable } from "../types"

/**
 * Swift File 생성을 위한 템플릿
 */
export const SWIFT_FILE_TEMPALTE = (content: string) => {
    return `
//
// from CFCommander

//

import Foundation
import SwiftUI

${content}
`
}

// Swift Emun 템플릿
export const SWIFT_ENUM_TEMPLATE = (
    enumName: string = "MyEnum",
    variables: Variable[]
) => {
    let enumCase = ""

    variables
        .sort((a, b) => {
            if (typeof a.value === "number" && typeof b.value === "number") {
                return a.value - b.value
            } else {
                return (a.name as any) - (b.name as any)
            }
        })
        .forEach((variable, idx) => {
            switch (idx) {
                case 0:
                    enumCase += `${variable.name}: ${variable.value}\n`
                    break
                case variables.length - 1:
                    enumCase += `\t${variable.name}: ${variable.value}`
                    break
                default:
                    enumCase += `\t${variable.name}: ${variable.value}\n`
                    break
            }
        })

    return `
enum ${parseEnumName(enumName)}: ${
        variables[0].type == "number" ? "CGFloat" : "String"
    } {
    ${enumCase}
}`
}

const parseEnumName = (enumName: string) => {
    return enumName.split("/").reduce((pre, cur) => (pre += cur))
}
