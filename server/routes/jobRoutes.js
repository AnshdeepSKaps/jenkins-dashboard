import fs from 'fs'
import path from 'path'
import express from 'express'
import { fileURLToPath } from 'url';

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

const router = express.Router()

router.get('', async (req, res) => {    // get all jobs

    let urls = file.links
    let jobs = []

    Promise.allSettled(urls.map(async (ele) => {
        try {
            const data = await fetch(ele.url + "api/json", {
                headers: {
                    "Authorization": 'Basic ' + btoa(ele.username + ":" + ele.token),
                }
            })

            const response = await data.json();

            const allPromise = Promise.all(response.jobs.map(async (job) => {

                return fetch(ele.url + "job/" + job.name + "/api/json", {
                    headers: {
                        "Authorization": 'Basic ' + btoa(ele.username + ":" + ele.token)
                    }
                })
                    .then(res => {
                        return res.json()
                    })
                    .then(data => {
                        let jobData = {
                            name: data.name,
                            lastGoodRun: data.lastSuccessfulBuild,
                            lastBuild: data.lastBuild
                        }
                        const promise = fetch(ele.url + "job/" + job.name + "/" + jobData.lastGoodRun.number + "/api/json", {
                            headers: {
                                "Authorization": 'Basic ' + btoa(ele.username + ":" + ele.token)
                            }
                        })
                        return Promise.all([promise, jobData])
                    })
                    .then(([res, jobData]) => Promise.all([res.json(), jobData]))
                    .then(([data, jobData]) => {
                        jobData.revision = (data.actions[1].lastBuiltRevision)
                        jobs.push(jobData)
                    })
            }))

            return allPromise

        }
        catch (err) {
            console.log("Some error with " + ele.url)
        }
    })
    )
        .then((results) => {
            console.log(jobs)
            res.json(jobs)
        })

})

export default router