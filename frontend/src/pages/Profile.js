import React, { useEffect } from 'react'

//components
import RelatedTravelLogDetails from '../components/details/RelatedTravelLogDetails'
import TravelLogForm from '../components/form/TravelLogForm'

//hooks
import {useTravelLogContext} from "../hooks/useTravelLogContext"

const Profile = () => {

  const {travelLogs:relatedTravelLogs, dispatch} = useTravelLogContext()

  //fetch data from backEnd
  useEffect(()=>{
    const fetchTravelLogs = async() => {
      //data fetched from backend (filter by id)
      const response = await fetch("/api/travelLogs/related")
      const json = await response.json()

      if(response.ok){
        dispatch({type:"SET_TRAVELLOGS", payload:json})
      }
    }

    fetchTravelLogs()
  },[dispatch])

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