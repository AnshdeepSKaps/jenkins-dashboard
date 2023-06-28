import React from 'react'

export default function TableRow(props) {
    return (
        <div className="table-row">
            <div className='table-col first-col'>{props.job.name}</div>
            <div className='table-col'>{props.job.lastBuild ? props.job.lastBuild.number : "N/A"}</div>
            <div className='table-col'>{props.job.lastGoodRun ? props.job.lastGoodRun.number : "N/A"}</div>
            <div className='table-col'>{props.job.revision?.SHA1 || "N/A"}</div>
            <div className='table-col'>{props.job.revision?.branch[0]?.name || "N/A"}</div>
            <div className='table-col'></div>
            <div className='table-col'></div>
            <div className='table-col'></div>
            <div className='table-col'></div>
        </div>
    )
}
