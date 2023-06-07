import express from 'express'
import links from '../links.json' assert { type: "json" };

const router = express.Router()

router.get('', async (req, res) => {    // get all jobs

    let url = links.links[0]

    const data = await fetch(url + "api/json")
    const response = await data.json();

    // console.log(response)
    let count = 0;
    let jobs = []

    response.jobs.forEach((job) => {
        fetch(url + "job/" + job.name + "/api/json")
            .then(res => res.json())

            .then(data => {

                let jobData = {
                    name: data.name,
                    lastGoodRun: data.lastSuccessfulBuild,
                    lastBuild: data.lastBuild
                }

                const promise = fetch(url + "job/" + job.name + "/" + jobData.lastGoodRun.number + "/api/json")
                return Promise.all([promise, jobData])
            })

            .then(([res, jobData]) => Promise.all([res.json(), jobData]))

            .then(([data, jobData]) => {
                jobData.revision = (data.actions[1].lastBuiltRevision)
                jobs.push(jobData)
                count++
                if (count === response.jobs.length) res.json(jobs)
            })
    })

    // response.jobs.forEach(async (job) => {

    //     fetch(url + "job/" + job.name + "/api/json")
    //         .then(res => res.json())
    //         .then(data => {
    //             let jobData = {
    //                 name: data.name,
    //                 lastGoodRun: data.lastSuccessfulBuild,
    //                 lastBuild: data.lastBuild
    //             }

    //             jobs.push(jobData)
    //             count++
    //             if (count == response.jobs.length) {
    //                 // console.log(jobs)
    //                 res.json(jobs)
    //             }
    //         })
    // })

    // jobs.forEach(async (job, index) => {

    //     const res = await fetch(url + "job/" + job.name + "/" + job.lastGoodRun.number + "/api/json")
    //     const data = await res.json()

    //     jobs[index].revision = data.actions[1].lastBuiltRevision
    // })

})

export default router