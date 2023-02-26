import React from 'react'
import { Link } from 'react-router-dom';


import "./TravelLogDetails.scss"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const TravelLogDetails = ({travelLog}) => {

  return (
    <>
    {travelLog.approved === "true" && (
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
              <p><strong>Updatet At: </strong>{formatDistanceToNow(new Date(travelLog.updatedAt), {addSuffix:true})}</p>
              <p><strong>By: </strong>{travelLog.userEmail}</p>
              <Link to={`/travel-log/${travelLog._id}`}>
                 <button className='btn btn-outline-success'>View More</button>
              </Link>
            </div>     
      </div>
    </div>
    )}
    </>
  )
}

export default TravelLogDetails