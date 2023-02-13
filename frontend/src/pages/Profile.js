import React, { useEffect, useState } from 'react'

//components
import RelatedTravelLogDetails from '../components/details/RelatedTravelLogDetails'
import TravelLogForm from '../components/form/TravelLogForm'

const Profile = () => {

  const [relatedTravelLogs, setRelatedTravelLogs] = useState(null)

  //fetch data from backEnd
  useEffect(()=>{
    const fetchTravelLogs = async() => {
      //data fetched from backend (filter by id)
      const response = await fetch("/api/travelLogs/related")
      const json = await response.json()

      if(response.ok){
        setRelatedTravelLogs(json)
      }
    }

    fetchTravelLogs()
  },[])

  return (
    <div className="row">
      <div className="col-8">
        {relatedTravelLogs && (
          relatedTravelLogs.map((relatedTravelLog)=>(
            <RelatedTravelLogDetails key={relatedTravelLog._id}  relatedTravelLog={relatedTravelLog}/>
          ))
        )}
      </div>
      <div className="col-4">
        <TravelLogForm/>
      </div>
    </div>
  )
}

export default Profile