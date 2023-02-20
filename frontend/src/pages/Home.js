import React, { useEffect } from 'react'
import TravelLogDetails from '../components/details/TravelLogDetails'

//hooks
import {useTravelLogContext} from "../hooks/useTravelLogContext"

const Home = () => {

  //state
  const {travelLogs, dispatch} = useTravelLogContext()

  //fetch data from backEnd
  useEffect(()=>{
    const fetchTravelLogs = async() => {
      const response = await fetch("/api/travelLogs/")
      const json = await response.json()

      if(response.ok){
        dispatch({type:"SET_TRAVELLOGS" , payload:json})
      }
    }

    fetchTravelLogs()
  },[dispatch])
  
  return (
    <div className='home'>
      {travelLogs && (
        travelLogs.map((travelLog)=>(
          <TravelLogDetails key={travelLog._id} travelLog={travelLog}/>
        ))
      )}
    </div>
  )
}

export default Home