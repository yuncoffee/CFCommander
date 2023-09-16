import * as fs from "fs"
import * as path from "path"
import chalk from "chalk"

import { exist } from "../utils/fs"
import {
    AliasVariable,
    CFCollection,
    CFCollectionType,
    ExplicitVariable,
    ExportType,
    Variable,
    VariableType,
} from "../types"
import { SWIFT_ENUM_TEMPLATE } from "../template/swiftStructTemplate"
import { VariableManager } from "../models/foundationModel"

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

// const makeDir = (date: string, count: number) => {
//     const postDirName = `./blog/${date.split("T")[0]}-${count}장/img`

// dirname.forEach((d, idx) => {
//     const pathBuilder = dirname.slice(0, idx + 1).join(path.sep)

//     if (!exist(pathBuilder)) {
//         fs.mkdirSync(`${pathBuilder}`)
//         console.log(chalk.bold.hex(`${COLOR_SUCCESS}`)("폴더 생성 완료."))
//     } else {

//     }
// })
// }
