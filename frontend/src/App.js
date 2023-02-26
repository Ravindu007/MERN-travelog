import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { useEffect, useState } from "react";



//pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import View from "./pages/View"
import Admin from "./pages/Admin";

import { useAuthContext } from "./hooks/useAuthContext";

//components
import Navbar from "./components/navbar/Navbar";

function App() {
  
  const {user} = useAuthContext()
  const [isAdmin, setIsAdmin] = useState(false)

  //check whether the logged in user is admin
  useEffect(()=>{
    if(user && user.email === process.env.REACT_APP_ADMIN_EMAIL){
      setIsAdmin(true)
    }else{
      setIsAdmin(false)
    }
  },[user])

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isAdmin={isAdmin}/>
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Home/> : <Navigate to="/login"/>} />
            <Route path="/profile" element={user ? <Profile/> : <Navigate to="/login"/>} />
            <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>} />
            <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/"/>} />
            <Route path="/travel-log/:id" element={user ? <View/> : <Navigate to="/login"/>} />
            <Route path="/admin" element={isAdmin ? <Admin/> : <Navigate to="/"/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
