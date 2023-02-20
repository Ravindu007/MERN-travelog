import React from 'react'
import { useNavigate } from 'react-router-dom'

import "./TravelLogDetails.scss"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const TravelLogDetails = ({travelLog}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/view', { state: { travelLog: travelLog } });
  }

  return (
    <div className='travelLogDetails'>
      <div className="row">
            <div className="images col-sm-12 col-md-6">
              <img src={travelLog.image ? `${travelLog.image}`:"/fallback.jpg"} alt={travelLog.image} className='mx-auto d-block img-fluid' style={{minHeight:"400px"}}/>
              </div>
            <div className="details col-sm-12 col-md-6">
              <p><strong>Name: </strong>{travelLog.title}</p>
              <p><strong>Place: </strong>{travelLog.place}</p>
              <p><strong>Date: </strong>{travelLog.date}</p>
              <p><strong>Created At: </strong>{formatDistanceToNow(new Date(travelLog.createdAt), {addSuffix:true})}</p>
              <button className='btn btn-outline-success' onClick={handleClick}>View More</button>
            </div>     
      </div>
    </div>
  )
}

export default TravelLogDetails