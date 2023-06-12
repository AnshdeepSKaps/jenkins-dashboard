import express, { response } from 'express'
import fs from 'fs'

let file = fs.readFileSync("links.json")
file = JSON.parse(file)

const router = express.Router()

router.get('', async (req, res) => {    // get all jobs

    let urls = file.links
    let jobs = []

    Promise.allSettled(urls.map(async (ele) => {
        try {
            const data = await fetch(ele.url + "api/json", {
                headers: {
                    "Authorization": 'Basic ' + btoa(ele.username + ":" + ele.token)
                }
            })
            const response = await data.json();

            response.jobs.forEach((job) => {

                fetch(ele.url + "job/" + job.name + "/api/json", {
                    headers: {
                        "Authorization": 'Basic ' + btoa(ele.username + ":" + ele.token)
                    }
                })
                    .then(res => res.json())
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
                        return "Done"
                    })
            })
        }
        catch (err) {
            console.log("Some error with " + ele.url)
            return "Invalid"
        }
    })                                                           // for each closing
    )                                                           // promise.all closing
        .then(() => {
            // console.log(jobs)
            res.json(jobs)
        })

})

export default router