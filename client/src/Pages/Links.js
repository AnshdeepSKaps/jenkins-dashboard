import server from '../components/ServerUrl'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

export default function Links() {

    const [url, setUrl] = useState({
        id: 1,
        username: "",
        url: "",
        token: ""
    })

    const [urls, setUrls] = useState([])
    const [id, setId] = useState(1)

    useEffect(() => {
        const fetchLinks = async () => {
            fetch(server.url + "/links")
                .then(res => res.json())
                .then(data => {
                    data.forEach(ele => {
                        let temp = urls
                        temp.push(ele)
                        setUrls(temp)
                    })
                    if (data.length > 0)
                        setId(data.slice(-1).id + 1)

                })
        }
        fetchLinks()
    }, [])

    const addURL = () => {
        if (url.url.slice(-1) !== "/") {
            let temp = url
            temp.url = url.url + "/"
            setUrl(temp)
        }
        setUrls([...urls, { ...url }])
        setId(id + 1)
    }

    const handleChange = (e) => {
        setUrl({
            ...url,
            id: id,
            [e.target.name]: e.target.value
        })
    }

    const handleSave = () => {

        const data = urls
        fetch(server.url + "/links", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === "ok") window.alert("Saved!")
            })
    }

    const handleDelete = (id) => {
        setUrls(urls.filter(ele => ele.id !== id))
    }

    return (
        <div>
            <Navbar />
            <h1 className='text-center mt-4'>Jenkins Instance URLs</h1>

            <div className="url-input w-75 mx-auto mt-4">
                <div className='d-flex align-items-center'>{id}</div>
                <input name="username" onChange={handleChange} className='' type="text" placeholder="Username" />
                <input name="url" onChange={handleChange} className='' type="text" placeholder="URL" />
                <input name="token" onChange={handleChange} className='' type="text" placeholder="Token" />
                <div onClick={addURL} className="btn btn-success">Add</div>
            </div>

            <div className='mt-5 p-5 link-container'>

                {
                    urls && urls.map((ele) => {
                        return <div className="link">
                            <div>{ele.id}</div>
                            <div>{ele.username}</div>
                            <div>{ele.url}</div>
                            <div onClick={() => handleDelete(ele.id)} className="btn btn-danger">Delete</div>
                        </div>
                    })
                }

                <div onClick={handleSave} className="btn btn-success mt-5 w-25 mx-auto">Save</div>
            </div>

        </div>
    )
}
