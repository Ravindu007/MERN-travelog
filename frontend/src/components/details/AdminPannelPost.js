import React from 'react'
import { useNavigate } from 'react-router-dom';


import "./RelatedTravelLogDetails.scss"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

//hooks
import {useTravelLogContext} from "../../hooks/useTravelLogContext"
import {useAuthContext} from "../../hooks/useAuthContext"

const AdminPannelPost = ({travelLog}, props) => {
  const navigate = useNavigate();


  const {dispatch} = useTravelLogContext()
  const {user} = useAuthContext()

  const handleAccept = async(e) => {
    
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', travelLog.title)
    formData.append('place', travelLog.place)
    formData.append('date', travelLog.date)
    formData.append('desc', travelLog.desc)
    formData.append('image', travelLog.image)
    formData.append('userEmail',travelLog.userEmail)
    formData.append('user_id', travelLog.user_id)
    formData.append('approved', true)

    const response = await fetch("/api/travelLogs/toAdmin",{
      method:'POST',
      body:formData,
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })

    const json = await response.json()


    //for approval field only
    const formDataForPatchRequest = new FormData()
    formDataForPatchRequest.append("approval", true)

    const response2 = await fetch("/api/travelLogs/" + travelLog._id, {
      method:"PATCH",
      body:formDataForPatchRequest,
      headers:{
        'Authorization': `${user.email} ${user.token}`
      }
    })

    const json2 = await response2.json();


    if(response.ok){
      dispatch({type:"CREATE_TRAVELLOG", payload:json})
      dispatch({type:"UPDATE_TRAVELLOG", payload:json2})
      console.log('travelLog created', json);
      console.log('travelLog updated', json2);

      navigate('/');
    }

  }

  return (
    <>
      {(
        travelLog.approval !== "true" && (
          <div className='RelatedTravelLogDetails'>
            <div className="row">
              <div className="images col-md-12">
                <img src={travelLog.image ? `${travelLog.image}`:"/fallback.jpg"} alt="" className='mx-auto d-block img-fluid'style={{maxHeight:"400px"}}/>
              </div>
              <div className="details col-md-12">
                <p><strong>Name: </strong>{travelLog.title}</p>
                <p><strong>Place: </strong>{travelLog.place}</p>
                <p><strong>Date: </strong>{travelLog.date}</p>
                <p><strong>Description: </strong>{travelLog.desc}</p>
                <p><strong>Approval: </strong>{travelLog.approval}</p>
                <p><strong>Created At: </strong>{formatDistanceToNow(new Date(travelLog.createdAt), {addSuffix:true})}</p>
                <p><strong>Created By: </strong>{travelLog.userEmail}</p>
                {!props.readOnly && (
                  <div className="buttons mb-3">
                    <button 
                      onClick={handleAccept} 
                      className='btn btn-outline-primary mr-2'
                    >
                      Accept
                    </button>
                    <button 
                      onClick={()=>{}}
                      className='btn btn-outline-danger'
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>     
            </div>
          </div>  
        )
      )}
    </>      
  )
}

export default AdminPannelPost