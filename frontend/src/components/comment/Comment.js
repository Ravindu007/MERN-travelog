import React from 'react'

const Comment = ({comment}) => {
  return (
    <div className="single-comment">
      <span style={{color:"blue"}}>{comment.text}</span> : <span>{comment.by}</span>
    </div>
  )
}

export default Comment