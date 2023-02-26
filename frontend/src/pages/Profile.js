import React, { useEffect, useState } from 'react'

//components
import RelatedTravelLogDetails from '../components/details/RelatedTravelLogDetails'
import TravelLogForm from '../components/form/TravelLogForm'

//hooks
import {useTravelLogContext} from "../hooks/useTravelLogContext"
import { useAuthContext } from '../hooks/useAuthContext'

const Profile = () => {

  const {travelLogs:relatedTravelLogs, dispatch} = useTravelLogContext()
  const {user} = useAuthContext()

  const [loading,setLoading] = useState(true)

  //fetch data from backEnd
  useEffect(()=>{

    const fetchTravelLogs = async() => {
      //data fetched from backend (filter by id)
      const response = await fetch("/api/travelLogs/related",{
        headers:{
          'Authorization': `${user.email} ${user.token}`
        }
      })
      const json = await response.json()

      if(response.ok){
        dispatch({type:'SET_TRAVELLOGS', payload:json})
        setLoading(false)
      }
    }

    if(user){
      fetchTravelLogs()
    }
  },[dispatch, user])

  return (
    <div className="row">
      <div className="col-8">
        {loading ? (
          <p>LOADING....</p>
        ) : (
          relatedTravelLogs && (
            relatedTravelLogs.map((relatedTravelLog)=>(
              <RelatedTravelLogDetails key={relatedTravelLog._id}  relatedTravelLog={relatedTravelLog}/>
            ))
          )
        )
        }
      </div>
      <div className="col-4">
        <TravelLogForm/>
      </div>
    </div>
  )
}

export default Profile