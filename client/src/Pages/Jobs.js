import React from 'react'
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react'
import server from '../components/ServerUrl';
import { CButton, CSpinner } from '@coreui/react'

export default function Jobs() {

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
            <Navbar />

            <h1 className='text-center mt-3 mb-3'>Your Jobs</h1>

            <div className='w-25 mb-3 mx-auto d-flex align-items-center justify-content-center'>
                {!res && <CButton disabled>
                    <CSpinner component="span" size="sm" aria-hidden="true" />
                    Loading...
                </CButton>}
            </div>

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
