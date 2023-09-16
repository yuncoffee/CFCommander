// interface

export interface AliasValue {
    collection: string
    name: string
}

export type VariableType =
    | "color"
    | "number"
    | "boolean"
    | "string"
    | "typography"

interface BaseVariable {
    name: string
    type: VariableType
}

export interface AliasVariable extends BaseVariable {
    isAlias: true
    value: AliasValue
}

export interface ExplicitVariable extends BaseVariable {
    isAlias: false
    value: string | number | boolean
}

export type Variable = AliasVariable | ExplicitVariable

export interface Mode {
    name: string
    variables: Variable[]
}

export interface Collection {
    name: string
    modes: Mode[]
}

export interface ExportType {
    collections: Collection[]
    version: string
    metadata: object
}

export type CFCollectionType = "color" | "font" | "layout" | "unknown"

export interface CFCollection extends Collection {
    type: CFCollectionType
}
