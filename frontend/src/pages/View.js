import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comment from '../components/comment/Comment';
import { useAuthContext } from '../hooks/useAuthContext';
import { useTravelLogContext } from '../hooks/useTravelLogContext';
//styles
import "./view.scss"
import formatDistanceToNow from "date-fns/formatDistanceToNow"


const View = () => {
  const {user} = useAuthContext()
  const {travelLogs:fetchedTravelLog, dispatch} = useTravelLogContext()

  //all comments
  const [comments, setAllCommnets] = useState("")


  const [isPostLoading, setIsPostLoading] = useState(true)
  const [isCommentsLoading, setIsCommentLoading] = useState(true)

  
   //for reload comments
   const [shouldReload, setShouldReload] = useState(false); // new state variable



  const { id } = useParams();


  useEffect(()=>{

    const fetchSingleTravelLogs = async() => {
      const response = await fetch("/api/travelLogs/singlePost/" + id, {
        headers:{
          'Authorization': `${user.email} ${user.token}`
        }
      })
      const json = await response.json()

      if(response.ok){
        //console.log(json);
        dispatch({type:"SET_TRAVELLOGS", payload:json})
        setIsPostLoading(false)
      }
    }

    const fetchAllComments = async() => {
      const response = await fetch("/api/travelLogs/comments",{
        headers:{
          'Authorization': `${user.email} ${user.token}`
        }
      })
      const json = await response.json()

      if(response.ok){
        //console.log("comments",json);
        setAllCommnets(json)
        setIsCommentLoading(false)
      }
    }

    if(user){
      fetchSingleTravelLogs()
      fetchAllComments()
    }


    

  },[user,dispatch, id, shouldReload])


  //for new comment
  const [newComment, setNewComment] = useState("")
  const userEmail = user.email
  const name = userEmail.split("@")[0]


  const addComment = async(e) => {
    
    e.preventDefault()

    const formData = new FormData()
    formData.append('text',newComment)
    formData.append('by', name)
    formData.append('post_id' ,fetchedTravelLog._id )


    const response = await fetch("/api/travelLogs/comments", {
      method:"POST",
      body:formData,
      headers:{
        'Authorization': `${user.email} ${user.token}`,
      }
    })

    const json = await response.json()

    if(response.ok){
      //console.log("new comment added",json);
      setShouldReload(true); // trigger a reload
      setNewComment("")
    }
  }


  return (
    <div className='view'>
      {isPostLoading ? (
        <p>LOADING...</p>
      ) : (
        fetchedTravelLog && (
          <div className="singleTravelLog">
            <div className="row detailsPart">
              <div className="image col-sm-12">
                <img src={fetchedTravelLog.image ? `${fetchedTravelLog.image}`:"/fallback.jpg"} alt="" className='mx-auto d-block img-fluid'style={{maxHeight:"400px", width:"40%"}}/>
              </div>
              <div className="details col-sm-12">
                <p><strong>Name: </strong>{fetchedTravelLog.title}</p>
                <p><strong>Place: </strong>{fetchedTravelLog.place}</p>
                <p><strong>Description: </strong>{fetchedTravelLog.desc}</p>
                <p><strong>Date: </strong>{fetchedTravelLog.date}</p>
                <p><strong>Created At: </strong>{formatDistanceToNow(new Date(fetchedTravelLog.createdAt), {addSuffix:true})}</p>
                <p><strong>Updatet At: </strong>{formatDistanceToNow(new Date(fetchedTravelLog.updatedAt), {addSuffix:true})}</p>
                <p><strong>By: </strong>{fetchedTravelLog.userEmail}</p>
              </div>
            </div>
            <div className="row commentsPart">
              <div className="comments col-sm-12">
                <p>Comments</p>
                {isCommentsLoading ? (
                  <p>Loading</p>
                ) : (
                  comments && (
                    comments.map((comment)=>(
                      fetchedTravelLog._id === comment.post_id ? (
                        <Comment key={comment._id} comment={comment}/>
                      ):(
                        null
                      )
                    ))
                  )
                )}
              </div>
              <div className="addComment col-sm-12">
                <form onSubmit={addComment}>
                  <div className="form-group">
                    <input 
                      className='form-control'
                      type="text"
                      onChange={e=>setNewComment(e.target.value)}
                      value={newComment}
                    />
                  </div>
                  <button className='btn btn-outline-primary'>Comment</button>
                </form>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default View;
