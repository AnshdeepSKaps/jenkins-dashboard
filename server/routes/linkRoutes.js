import fs from 'fs'
import path from 'path'
import express from 'express'
import { fileURLToPath } from 'url';

const router = express.Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let file = { links: [] }
try {
    file = fs.readFileSync(path.resolve(__dirname, "../links.json"))
    file = JSON.parse(file)
}
catch {
    console.log("links.json not found")
}

router.get("", (req, res) => {

    const data = file.links.map((link) => {
        return { id: link.id, username: link.username, url: link.url }
    })
    
    console.log(data)
    res.json(data)
})


router.post("", (req, res) => {

    const newLinks = req.body
    const newFile = { links: [] }

    if (newLinks) {
        newLinks.forEach(newLink => {

            const found = file.links.find(ele => ele.id === newLink.id)
            if (!found) {
                newFile.links.push(newLink)
            }
            else newFile.links.push(found)

        })

        fs.writeFile("links.json", JSON.stringify(newFile), (err) => {
        })
    }

    res.send({ status: "ok" })
})



export default router


