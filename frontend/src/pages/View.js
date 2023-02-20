import React from 'react';
import { useLocation } from 'react-router-dom'


const View = () => {
  const location = useLocation();
  const travelLog = location.state.travelLog;

  return (
    <div>
      <div className="images col-sm-12 col-md-6">
              <img src={travelLog.image ? `${travelLog.image}`:"/fallback.jpg"} alt={travelLog.image} className='mx-auto d-block img-fluid' style={{minHeight:"400px"}}/>
      </div>
      <h2>{travelLog.title}</h2>
      <p>{travelLog.desc}</p>
    </div>
  );
};

export default View;
