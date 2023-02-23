import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"



//pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import View from "./pages/View"

import { useAuthContext } from "./hooks/useAuthContext";

//components
import Navbar from "./components/navbar/Navbar";

function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Home/> : <Navigate to="/login"/>} />
            <Route path="/profile" element={user ? <Profile/> : <Navigate to="/login"/>} />
            <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>} />
            <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/"/>} />
            <Route path="/view" element={user ? <View/> : <Navigate to="/login"/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
