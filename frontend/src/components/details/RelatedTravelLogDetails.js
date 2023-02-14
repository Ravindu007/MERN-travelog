import React from 'react'

import "./RelatedTravelLogDetails.scss"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const RelatedTravelLogDetails = ({relatedTravelLog}) => {
  return (
    <div className='RelatedTravelLogDetails'>
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
            </div>     
      </div>
    </div>
  )
}

export default RelatedTravelLogDetails