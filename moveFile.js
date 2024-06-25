import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { promisify } from 'util'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const srcDir = path.resolve(__dirname, 'public')
const destDir = path.resolve(__dirname, '../../../Scripts')
const mainDir = path.resolve(__dirname, './')

const readdir = promisify(fs.readdir)
const copyFile = promisify(fs.copyFile)
const mkdir = promisify(fs.mkdir)

async function copyFiles() {
  try {
    if (!fs.existsSync(destDir)) {
      await mkdir(destDir, { recursive: true })
    }

    const files = await readdir(srcDir)
    for (const file of files) {
      const srcPath = path.join(srcDir, file)
      const destPath =
        file === 'main.js'
          ? path.join(mainDir, file)
          : path.join(destDir, file)
      console.log(file, destPath)
      await copyFile(srcPath, destPath)
    }
  } catch (err) {
    console.error(`Error copying files: ${err.message}`)
  }
}

copyFiles()
