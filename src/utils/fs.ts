import * as fs from "fs"

export const exist = (dir: fs.PathLike) => {
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
