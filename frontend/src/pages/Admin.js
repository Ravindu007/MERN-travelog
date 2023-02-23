import React, { useEffect, useState} from 'react'
import AdminPannelPost from '../components/details/AdminPannelPost'

//hooks
import {useTravelLogContext} from "../hooks/useTravelLogContext"
import { useAuthContext } from '../hooks/useAuthContext'

const Admin = () => {

  //state
  const {travelLogs, dispatch} = useTravelLogContext()
  const {user} = useAuthContext()

  const[isLoading, setIsLoading] = useState(true)


  //fetch data from backEnd
  useEffect(()=>{
    const fetchTravelLogs = async() => {
      const response = await fetch("/api/travelLogs/adminAllTravelLogs", {
        headers:{
          'Authorization': `${user.email} ${user.token}`
        }
      })
      const json = await response.json()

      if(response.ok){
        dispatch({type:"SET_TRAVELLOGS" , payload:json})
        setIsLoading(false)
      }
    }

    if(user){
      fetchTravelLogs()
    }
  },[dispatch, user])
  
  return (
    <div className='home'>
      {isLoading ? (
        <p>Loading...</p>
      ):(
         travelLogs && (
          travelLogs.map((travelLog)=>(
            <AdminPannelPost key={travelLog._id} travelLog={travelLog}/>
          ))
        )
      )}
    </div>
  )
}

export default Admin