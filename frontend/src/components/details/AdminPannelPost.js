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

    //create new doc in new collection
    const response = await fetch("/api/travelLogs/toAdmin",{
      method:'POST',
      body:formData,
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })

    const json = await response.json()



    //update existing doc in existing collection
    const related_id = json["_id"] //getting id of the newly created doc

    const formDataForPatchRequest = new FormData()
    formDataForPatchRequest.append("approval", true)
    formDataForPatchRequest.append("related_id",related_id) //similar field to make reference

    const response2 = await fetch("/api/travelLogs/adminApproved/" + travelLog._id, {
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