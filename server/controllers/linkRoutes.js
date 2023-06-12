import fs from 'fs'
import express from 'express'

const router = express.Router()

let file = fs.readFileSync("links.json")
file = JSON.parse(file)

router.get("", (req, res) => {

    const data = file.links.map((link) => {
        return { id: link.id, username: link.username, url: link.url }
    })

    res.json(data)
})


router.post("", (req, res) => {

    const newLinks = req.body
    const newFile = { links: [] }

    newLinks.forEach(newLink => {

        const found = file.links.find((ele, index) => ele.id == newLink.id)
        if (!found) {
            newFile.links.push(newLink)
        }
        else newFile.links.push(found)

    })

    fs.writeFile("links.json", JSON.stringify(newFile), (err) => {
    })

    res.send({ status: "ok" })
})



export default router


