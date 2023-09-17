import childProcess from "child_process"
import { convertToVariableManager } from "./readJson"

try {
    convertToVariableManager()

    // 커밋 및 푸시
    childProcess.execSync('git config user.name "yuncoffee"')
    childProcess.execSync('git config user.email "dong072815@gmail.com"')
    childProcess.execSync("git add .")
    childProcess.execSync('git commit -m "Create new folder and file"')
    childProcess.execSync("git push")
} catch (error) {
    console.error("An error occurred:", error)
    process.exit(1)
}
