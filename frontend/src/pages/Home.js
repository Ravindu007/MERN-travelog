import React, { useEffect, useState } from 'react'
import TravelLogDetails from '../components/details/TravelLogDetails'

//hooks
import {useTravelLogContext} from "../hooks/useTravelLogContext"
import { useAuthContext } from '../hooks/useAuthContext'

const Home = () => {

  //state
  const {travelLogs, dispatch} = useTravelLogContext()
  const {user} = useAuthContext()

  const [loading,setLoading] = useState(true)


  //fetch data from backEnd
  useEffect(()=>{

    const fetchTravelLogs = async() => {
      const response = await fetch("/api/travelLogs/", {
        headers:{
          'Authorization': `${user.email} ${user.token}`
        }
      })
      const json = await response.json()

      if(response.ok){
        dispatch({type:"SET_TRAVELLOGS" , payload:json})
        setLoading(false)
      }
    }

    if(user){
      fetchTravelLogs()
    }
  },[dispatch, user])
  
  return (
    <div className='home'>
      {loading ? (
        <p>LOADING....</p>
      ):(
        travelLogs && (
          travelLogs.map((travelLog)=>(
            <TravelLogDetails key={travelLog._id} travelLog={travelLog}/>
          ))
        )
      )}
    </div>
  )
}

export default Home