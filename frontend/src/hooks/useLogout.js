import {useAuthContext} from "./useAuthContext"

export const useLogout = () => {

  const {dispatch} = useAuthContext()

  const logout = () => {
    //remove the tolen 
    localStorage.removeItem('user')

    //dispatch logout action
    dispatch({type:"LOGOUT"})
  }

  return {logout}
} 