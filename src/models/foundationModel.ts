import { CFCollection, CFCollectionType, Collection, Mode } from "../types"

export class VariableManager implements Collection {
    name: string
    modes: Mode[]
    type: CFCollectionType

    constructor(collection: CFCollection) {
        this.name = collection.name
        this.modes = collection.modes
        this.type = collection.type
    }
}

// class FoundationManager {
//     layoutManager: VariableManager
//     colorManager: VariableManager
//     fontManager: VariableManager

//     constructor(collections: Collection[]) {
//         this.colorManager
//     }
// }
