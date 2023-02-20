import React, { useState } from 'react'

import "./RelatedTravelLogDetails.scss"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

//hooks
import {useTravelLogContext} from "../../hooks/useTravelLogContext"

const RelatedTravelLogDetails = ({relatedTravelLog}, props) => {

  const {dispatch} = useTravelLogContext()

  //updating 
  const [isEditing, setIsEditing] = useState(false)

  const[draftTitle, setDraftTitle] = useState()
  const[draftPlace, setDraftPlace] = useState("")
  const[draftDate, setDraftDate] = useState("")
  const[draftDesc, setDraftDesc] = useState("")
  const[draftImage, setDraftImage] = useState(null)

  const handleUpdate = async(e) => {
    e.preventDefault()
    setIsEditing(false)
    const formData = new FormData() 

    formData.append('title', draftTitle)
    formData.append('place', draftPlace)
    formData.append('date', draftDate)
    formData.append('desc', draftDesc)
    formData.append('image', draftImage)

    const response = await fetch("/api/travelLogs/" + relatedTravelLog._id, {
      method:"PATCH",
      body:formData
    })

    const json = await response.json()

    if(response.ok){
      dispatch({type:"UPDATE_TRAVELLOG", payload:json})
    }
  }

  const handleDelete = async() => {
    
      const response = await fetch("/api/travelLogs/" + relatedTravelLog._id,{
        method:"DELETE"
      })

      const json = await response.json()

      if(response.ok){
        dispatch({type:"DELETE_TRAVELLOG", payload:json})
      }
    
  }


  return (
    <div className='RelatedTravelLogDetails'>
      {isEditing && (
        <div className="row">

        <form onSubmit={handleUpdate} encType="multipart/form-data">
          <div className="images col-md-12">
                  <div className="form-group">
                    <label>Image</label>
                    <input
                      type="file"
                      name="image"
                      onChange={(e) => setDraftImage(e.target.files[0])}
                      className="form-control-file"
                    />
                  </div>
          </div>
          <div className="details col-md-12">
                  <div className="form-group">
                  <label>Title</label>
                  <input 
                    type="text"
                    name="title"
                    onChange={e=>setDraftTitle(e.target.value)}
                    value={draftTitle}
                    className="form-control"
                  />
                  </div>

                  <div className="form-group">
                  <label>Place</label>
                  <input 
                    type="text"
                    name="place"
                    onChange={e=>setDraftPlace(e.target.value)}
                    value={draftPlace}
                    className="form-control"
                  />
                  </div>

                  <div className="form-group">
                  <label>Date</label>
                  <input 
                    type="date"
                    name='date'
                    onChange={e=>setDraftDate(e.target.value)}
                    value={draftDate}
                    className="form-control"
                  />
                  </div>

                  <div className="form-group">
                  <label>Description</label>
                  <textarea 
                    rows="4" cols="50"
                    name='desc'
                    onChange={e=>setDraftDesc(e.target.value)}
                    value={draftDesc}
                    className="form-control"
                  />
                  </div>

                  <div className="buttons">
                      <button 
                        className='btn btn-outline-primary'
                        type='submit'
                      >
                        Save
                      </button>
                      <button
                        className='btn btn-outline-secondary'
                        onClick={()=>{
                          setIsEditing(false)
                        }}
                        >
                        Cancel  
                      </button>
                  </div>
          </div>

        </form>
        </div>
      )}
      {!isEditing && (
          <div className="row">
            <div className="images col-md-12">
              <img src={relatedTravelLog.image ? `${relatedTravelLog.image}`:"/fallback.jpg"} alt="" className='mx-auto d-block img-fluid'style={{maxHeight:"400px"}}/>
            </div>
            <div className="details col-md-12">
                <p><strong>Name: </strong>{relatedTravelLog.title}</p>
                <p><strong>Place: </strong>{relatedTravelLog.place}</p>
                <p><strong>Date: </strong>{relatedTravelLog.date}</p>
                <p><strong>Description: </strong>{relatedTravelLog.desc}</p>
                <p><strong>Created At: </strong>{formatDistanceToNow(new Date(relatedTravelLog.createdAt), {addSuffix:true})}</p>
                {!props.readOnly && (
                  <div className="buttons mb-3">
                    <button 
                      onClick={handleDelete} 
                      className='btn btn-outline-danger mr-2'
                      >
                        Delete
                      </button>
                    <button 
                      onClick={()=>{
                        setIsEditing(true)
                        setDraftTitle(relatedTravelLog.title)
                        setDraftPlace(relatedTravelLog.place)
                        setDraftDesc(relatedTravelLog.desc)
                        setDraftImage(relatedTravelLog.image)
                      }}
                      className='btn btn-outline-primary'
                      >
                        Update
                      </button>
                  </div>
                )}
            </div>     
        </div>
      )}
    </div>
  )
}

export default RelatedTravelLogDetails