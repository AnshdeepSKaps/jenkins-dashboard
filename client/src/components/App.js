import { useState } from 'react'
import server from './ServerUrl'
import React, { useEffect } from 'react'
// import base64 from 'react-native-base64'
// 119c90789bca7be7f885481fc4b7b17edc

export default function App() {

    const [res, setRes] = useState(null);

    const fetchData = async () => {
        fetch(server.url + "/job")
            .then(res => res.json())
            .then(data => {

                setRes(data);
                let rows = document.getElementsByClassName("table-row")
                Array.from(rows).forEach(row => {

                    if (row.children[0].classList.contains("field-name")) {
                        return
                    }

                    if (row.children[1].innerHTML === "N/A") {
                        row.children[1].classList.toggle("bg-red")
                        row.children[2].classList.toggle("bg-red")
                    }
                    else if (row.children[1].innerHTML === row.children[2].innerHTML) {
                        row.children[1].classList.toggle("bg-green")
                        row.children[2].classList.toggle("bg-green")
                    }
                    else {
                        row.children[1].classList.toggle("bg-red")
                        row.children[2].classList.toggle("bg-green")
                    }
                })

                Array.from(rows)[rows.length - 1].style.borderBottom = "2px solid black"
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <h1 className='text-center mt-3 mb-5'>Your Jobs</h1>

            <div className='table-container mx-auto d-flex flex-column justify-content-center'>
                <div className='table-row'>
                    <div className='field-name first-col'>Jobs</div>
                    <div className='field-name'>Last Build</div>
                    <div className='field-name'>Last Good Run</div>
                    <div className='field-name'>Revision</div>
                    <div className='field-name'>Branch</div>
                    <div className='field-name'>Unit Tests</div>
                    <div className='field-name'>Code Coverage </div>
                    <div className='field-name'>Sonar Issues</div>
                    <div className='field-name'>Latest Final Build Package</div>
                </div>
                {res &&
                    res.map((job) => {
                        return <div class="table-row">
                            <div className='table-col first-col'>{job.name}</div>
                            <div className='table-col'>{job.lastBuild ? job.lastBuild.number : "N/A"}</div>
                            <div className='table-col'>{job.lastGoodRun ? job.lastGoodRun.number : "N/A"}</div>
                            <div className='table-col'>{job.revision.SHA1}</div>
                            <div className='table-col'>{job.revision.branch[0].name}</div>
                            <div className='table-col'></div>
                            <div className='table-col'></div>
                            <div className='table-col'></div>
                            <div className='table-col'></div>
                        </div>
                    })
                }
            </div>

        </div>
    )
}
