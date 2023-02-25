import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import Comment from '../components/comment/Comment';
import { useAuthContext } from '../hooks/useAuthContext';

//styles
import "./view.scss"

const View = () => {

  const location = useLocation();
  const travelLog = location.state.travelLog;

  const {user} = useAuthContext()

  const [comments,setComments] = useState(null)

  //for new comment
  const [newComment, setNewComment] = useState("") //text filed

  //for reload comments
  const [shouldReload, setShouldReload] = useState(false); // new state variable


  useEffect(()=>{
    //fetch comments
    const fetchAllRelatedComments = async() => {
      const response =  await fetch("/api/travelLogs/singlePost/comments",{
        headers:{
          'Authorization': `${user.email} ${user.token}`
        }
      })
      const json = await response.json() 

      if(response.ok){
        setComments(json)
      }
    }  
    
    fetchAllRelatedComments()
  },[user, shouldReload])

  


  const handleSubmit = async(e) =>{
    e.preventDefault()

    const formDataComment = new FormData()
    formDataComment.append('text', newComment)
    formDataComment.append('by', user.email )
    formDataComment.append('post_id', travelLog._id)


    const responseComment = await fetch("/api/travelLogs/singlePost/comments",{
      method:"POST",
      body:formDataComment,
      headers:{
        'Authorization': `${user.email} ${user.token}`
      }
    })

    const json = await responseComment.json()

    if(responseComment.ok){
      setNewComment("")
      console.log("New comment added",json);
      setShouldReload(true); // trigger a reload
    }
  }

  return (
    <div className='view'>
      <div className="details">
        <div className="images col-sm-12 col-md-6">
              <img src={travelLog.image ? `${travelLog.image}`:"/fallback.jpg"} alt={travelLog.image} className='mx-auto d-block img-fluid' style={{minHeight:"400px"}}/>
      </div>
      
      <h2>{travelLog.title}</h2>
      <p>{travelLog.desc}</p>
      </div>
      <div className="comments-section">
        <div className="comments">
          {comments && comments.map((comment)=>(
            comment.post_id === travelLog._id ? (
              <Comment key={comment._id} comment={comment}/>
            ):null
          ))}
        </div>
        <div className="add-new-comment">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              
              <input 
                type="text" 
                onChange={e=>{setNewComment(e.target.value)}}
                value={newComment}
                className="form-control"
              />
            </div>
            <button className='btn btn-outline-primary'>comment</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default View;
