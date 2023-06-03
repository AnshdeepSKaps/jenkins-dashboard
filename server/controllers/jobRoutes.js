import express from 'express'
import links from '../links.json' assert { type: "json" };

const router = express.Router()

router.get('', async (req, res) => {    // get all jobs

    let url = links.links[0]

    const data = await fetch(url + "api/json")
    const response = await data.json();

    // console.log(response)

    let jobs = []
    var count = 0
    
    response.jobs.forEach(async (job) => {

        fetch(url + "job/" + job.name + "/api/json")
            .then(res => res.json())
            .then(data => {
                let jobData = {
                    name: data.name,
                    lastGoodRun: data.lastSuccessfulBuild,
                    lastBuild: data.lastBuild
                }

                jobs.push(jobData)
                count++
                if (count == response.jobs.length){
                    // console.log(jobs)
                    res.json(jobs)
                }
            })
    })
})

export default router