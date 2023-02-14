import React, { useState } from 'react'

const TravelLogForm = () => {
  const [title, setTitle] = useState('')
  const [place, setPlace] = useState('')
  const [date, setDate] = useState('')
  const [desc, setDesc] = useState('')
  const [image, setImage] = useState(null)

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    const formData = new FormData()
    formData.append('title', title)
    formData.append('place', place)
    formData.append('date', date)
    formData.append('desc', desc)
    formData.append('image', image)

    const response = await fetch("/api/travelLogs/",{
      method:'POST',
      body:formData
    })

    const json = await response.json()

    if(response.ok){
      setTitle('')
      setPlace('')
      setDate('')
      setDesc('')
      setImage(null)
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

        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            name="image"
            className="form-control-file"
          />
        </div>

        <button className='btn btn-outline-primary'>Add</button>
      </form>
    </div>
  )
}

export default TravelLogForm