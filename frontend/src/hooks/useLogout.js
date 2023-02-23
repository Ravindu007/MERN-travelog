import {useAuthContext} from "./useAuthContext"
import { useTravelLogContext } from "./useTravelLogContext"

export const useLogout = () => {

  const {dispatch} = useAuthContext()
  const {dispatch:travelLogDispatch} = useTravelLogContext()

  const logout = () => {
    //remove the tolen 
    localStorage.removeItem('user')

    //dispatch logout action
    dispatch({type:"LOGOUT"})
    travelLogDispatch({type:"SET_TRAVELLOGS", payload:null})
  }

  return {logout}
} 