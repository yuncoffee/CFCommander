import * as fs from "fs"
import * as path from "path"
import chalk from "chalk"
import {
    AliasVariable,
    CFCollection,
    CFCollectionType,
    ExplicitVariable,
    ExportType,
    Variable,
    VariableType,
} from "../types"
import {
    SWIFT_ENUM_TEMPLATE,
    SWIFT_FILE_TEMPALTE,
} from "../template/swiftStructTemplate.js"
import { VariableManager } from "../models/foundationModel.js"

export const readVariableJson = (filePath = "./sample.json") => {
    try {
        // 파일을 동기적으로 읽어와서 문자열로 저장
        const jsonContent = fs.readFileSync(filePath, "utf-8")

        // JSON 파싱
        const data: ExportType = JSON.parse(jsonContent)

        // 데이터 사용 예제
        return data
    } catch (error) {
        console.error("파일을 읽을 수 없습니다:", error)
    }
}

export const checkCollectionType = (type: VariableType) => {
    let result: CFCollectionType = "unknown"
    switch (type) {
        case "color":
            result = "color"
            break
        case "number":
            result = "layout"
            break
        case "typography":
            result = "font"
            break
        default:
            break
    }
    return result
}

export const convertToVariableManager = () => {
    const FOUNDATIONS: { [key: string]: any[] } = {
        layout: [],
        color: [],
        font: [],
    }

    const json = readVariableJson()

    const CFCollections = json?.collections.map((collection) => {
        let result: CFCollection = {
            ...collection,
            type: checkCollectionType(collection.modes[0].variables[0].type),
        }
        return result
    })

    CFCollections?.filter((v) => v.type != "unknown").map((v) => {
        if (
            v.name.startsWith("Foundation") ||
            v.name.startsWith("Typography")
        ) {
            FOUNDATIONS[v.type].push(new VariableManager(v))
        }
    })

    makeLayoutVariableContent(FOUNDATIONS.layout)

    // console.log(FOUNDATIONS)

    // const isAliasList = FoundationSpace![1].modes
    //     .map((v) => v.variables)[0]
    //     .filter((v: Variable) => v.isAlias == true)
    //     .map((v) => {
    //         const _v = v as AliasVariable
    //         const findValue = FoundationSpace?.find(
    //             (v) => v.name == _v.value.collection
    //         )?.modes[0].variables.filter(
    //             (v) => v.name == _v.value.name
    //         )[0] as ExplicitVariable
    //         v.value = findValue?.value

    //         return v
    //     })
    // console.log(json)
    // console.log(FoundationSpace)
    // console.log(isAliasList)
    // const myTemplate = SWIFT_ENUM_TEMPLATE("MySpace", isAliasList)
    // console.log(myTemplate)
}

function makeLayoutVariableContent(variables: VariableManager[]) {
    let content = ""
    variables
        .flatMap((v) => {
            return {
                name: v.name,
                variables: v.modes.map((v) => v.variables)[0],
            }
        })
        .forEach((variable) => {
            content += `${SWIFT_ENUM_TEMPLATE(
                variable.name,
                variable.variables
            )}\n`
        })
    createSwiftFile("Foundation/Layout", content)
}

const createSwiftFile = (dirPath: string, content: string) => {
    createDirectory(dirPath)
    const _dirPath = `./${dirPath}`

    const file = {
        name: path.join(`${_dirPath}`, `layout.swift`),
        content: SWIFT_FILE_TEMPALTE(content),
    }

    if (exist(file.name)) {
        chalk.bold.hex(`#646464`)("이미 해당 파일이 존재합니다")
    } else {
        fs.writeFileSync(file.name, file.content)
        console.log(chalk.bold.hex(`#424242`)("파일 생성 완료."))
    }
}

const createDirectory = (dirPath: string) => {
    const dirName = path
        .relative(".", path.normalize(dirPath))
        .split(path.sep)
        .filter((p) => !!p)

    dirName.forEach((_, idx) => {
        const pathBuilder = dirName.slice(0, idx + 1).join(path.sep)

        if (!exist(pathBuilder)) {
            fs.mkdirSync(`${pathBuilder}`)
            console.log(chalk.bold.hex(`#424242`)("폴더 생성 완료."))
        } else {
            console.error(
                chalk.bold.hex(`#646464`)("이미 동일한 폴더명이 존재합니다.")
            )
        }
    })
}

const exist = (dir: fs.PathLike) => {
    try {
        fs.accessSync(
            dir,
            fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK
        )
        return true
    } catch (e) {
        return false
    }
}

// const pathName: fs.PathLike = "./foundation"

// const dirname = path
//     .relative(".", path.normalize(pathName))
//     .split(path.sep)
//     .filter((p) => !!p)

// // console.log(dirname)
// dirname.forEach((d, idx) => {
//     const pathBuilder = dirname.slice(0, idx + 1).join(path.sep)
//     console.log(pathBuilder)
//     if (!exist(pathBuilder)) {
//         fs.mkdirSync(`${pathBuilder}`)
//     } else {
//         console.error(
//             chalk.bold.hex(`${"#FF2929"}`)(
//                 "이미 동일한 폴더명이 존재합니다."
//             )
//         )
//     }
// })
// }
