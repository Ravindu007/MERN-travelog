import React from 'react'

import "./TravelLogDetails.scss"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const TravelLogDetails = ({travelLog}) => {
  return (
    <div className='travelLogDetails'>
      <div className="row">
            <div className="images col-sm-12 col-md-6">
              <img src={travelLog.photo ? `/uploaded-photos/${travelLog.photo}`:"/fallback.jpg"} alt=""  className='mx-auto d-block img-fluid'/>
              </div>
            <div className="details col-sm-12 col-md-6">
              <p><strong>Name: </strong>{travelLog.title}</p>
              <p><strong>Place: </strong>{travelLog.place}</p>
              <p><strong>Date: </strong>{travelLog.date}</p>
              <p><strong>Description: </strong>{travelLog.desc}</p>
              <p><strong>Created At: </strong>{formatDistanceToNow(new Date(travelLog.createdAt), {addSuffix:true})}</p>
            </div>     
      </div>
    </div>
  )
}

export default TravelLogDetails