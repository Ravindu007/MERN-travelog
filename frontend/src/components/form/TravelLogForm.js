import React, { useState } from 'react'

const TravelLogForm = () => {
  const[title, setTitle] = useState("")
  const[place, setPlace] = useState("")
  const[date, setDate] = useState("")
  const[desc, setDesc] = useState("")

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    const travelLog = {title, place, date, desc}

    const response = await fetch("/api/travelLogs/",{
      method:'POST',
      body:JSON.stringify(travelLog),
      headers:{
        'Content-Type':'application/json'
      }
    })

    const json = await response.json()

    if(response.ok){
      setTitle('')
      setPlace('')
      setDate('')
      setDesc('')
      console.log('travelLog created', json);
    }
  }

  return (
    <div className="travelLogForm">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <h3>Add a new TravelLog</h3>

        <div className="form-group">
        <label>Title</label>
        <input 
          type="text"
          onChange={e=>setTitle(e.target.value)}
          value={title}
          className="form-control"
        />
        </div>

        <div className="form-group">
        <label>Place</label>
        <input 
          type="text"
          onChange={e=>setPlace(e.target.value)}
          value={place}
          className="form-control"
        />
        </div>

        <div className="form-group">
        <label>Date</label>
        <input 
          type="text"
          onChange={e=>setDate(e.target.value)}
          value={date}
          className="form-control"
        />
        </div>

        <div className="form-group">
        <label>Description</label>
        <textarea 
          rows="4" cols="50"
          onChange={e=>setDesc(e.target.value)}
          value={desc}
          className="form-control"
        />
        </div>

        <button className='btn btn-outline-primary'>Add</button>
      </form>
    </div>
  )
}

export default TravelLogForm