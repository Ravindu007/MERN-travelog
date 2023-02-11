import React, { useEffect, useState } from 'react'
import TravelLogDetails from '../components/TravelLogDetails'

const Home = () => {

  const [travelLogs, setTravelLogs] = useState(null)


  //fetch data from backEnd
  useEffect(()=>{
    const fetchTravelLogs = async() => {
      const response = await fetch("/api/travelLogs/")
      const json = await response.json()

      if(response.ok){
        setTravelLogs(json)
      }
    }

    fetchTravelLogs()
  },[])
  
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