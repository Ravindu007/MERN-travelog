import { createContext, useReducer} from "react"


export const TravelLogContext = createContext()

export const tarvelLogReducer  = (state, action) => {
  switch(action.type){
    case 'SET_TRAVELLOGS':
      return {
        travelLogs:action.payload
      }
    case 'CREATE_TRAVELLOG':
      return{
        travelLogs:[action.payload , ...state.travelLogs]
      }
    case 'DELETE_TRAVELLOG':
      return{
        travelLogs:state.travelLogs.filter((travelLog)=>travelLog._id !== action.payload._id)
      }
    case "UPDATE_TRAVELLOG":
      const updateTravelLogs = state.travelLogs.map(travelLog => travelLog._id === action.payload._id ? action.payload : travelLog)
      return{
        travelLogs:updateTravelLogs
      }
    default:
      return state
  }
}

export const TravelLogContextProvider = ({children}) => {

  const [state, dispatch] = useReducer(tarvelLogReducer, {
    travelLogs :null
  })

  return (
    <TravelLogContext.Provider value={{...state, dispatch}}>
      {children}
    </TravelLogContext.Provider>
  )
}