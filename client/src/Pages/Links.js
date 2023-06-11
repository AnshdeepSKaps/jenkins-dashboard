import React, { useState } from 'react'
import Navbar from '../components/Navbar'

export default function Links() {

    const [url, setUrl] = useState({
        id: 0,
        url: "",
        token: ""
    })

    const [urls, setUrls] = useState([])
    const [id, setId] = useState(1)

    const addURL = () => {
        // console.log(url)
        setUrls([...urls, { ...url }])
        console.log(urls)
        setId(id + 1)
    }

    const handleChange = (e) => {
        setUrl({
            ...url,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <Navbar />
            <h1 className='text-center mt-4'>Jenkins Instance URLs</h1>

            <div className="url-input w-75 mx-auto mt-4 d-flex flex-col">
                <div className='d-flex align-items-center'>{id}</div>
                <input name="url" onChange={handleChange} className='w-50' type="text" placeholder="URL" />
                <input name="token" onChange={handleChange} className='w-50' type="text" placeholder="Token" />
                <div onClick={addURL} className="btn btn-success">Add</div>
            </div>

            <div className='d-flex flex-column align-items-center justify-content-center mt-5'>
                {
                    urls && urls.map((ele) => {
                        return <div className="d-flex align-items-center justify-content-center">
                            <div>{ele.id}</div>
                            <div>{ele.url}</div>
                            <div>{ele.token}</div>
                        </div>
                    })
                }
            </div>



        </div>
    )
}
