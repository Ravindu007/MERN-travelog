import React, { useState } from 'react'
//hooks
import {useTravelLogContext} from "../../hooks/useTravelLogContext"
import { useAuthContext } from '../../hooks/useAuthContext'

const TravelLogForm = () => {

  const {dispatch} = useTravelLogContext()
  const {user} = useAuthContext()

  const [isLoading, setIsLoading] = useState(null)

  const [title, setTitle] = useState('')
  const [place, setPlace] = useState('')
  const [date, setDate] = useState('')
  const [desc, setDesc] = useState('')
  const [image, setImage] = useState(null)

  const handleSubmit = async(e) => {

    if(!user){
      console.log('You must logged first')
      return
    }
    e.preventDefault()

    setIsLoading(true)
    
    const formData = new FormData()
    formData.append('title', title)
    formData.append('place', place)
    formData.append('date', date)
    formData.append('desc', desc)
    formData.append('image', image)
    formData.append('approval', false)
    formData.append('related_id', title)

    const response = await fetch("/api/travelLogs/",{
      method:'POST',
      body:formData,
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })

    const json = await response.json()

    if(response.ok){
      setTitle('')
      setPlace('')
      setDate('')
      setDesc('')
      setImage(null)
      dispatch({type:"CREATE_TRAVELLOG", payload:json})
      // console.log('travelLog created', json);
      setIsLoading(false)
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
          type="date"
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

        <button disabled={isLoading} className='btn btn-outline-primary'>Add</button>
      </form>
    </div>
  )
}

export default TravelLogForm