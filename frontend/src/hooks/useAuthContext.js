import { useContext } from "react"; 
import { AuthContext } from "../context/authContext";

export const useAuthContext = () => {
  const context =useContext(AuthContext)

  if(!context){
    throw Error("AuthContext should be use inside AuthContext Provider")
  }
  return context
}