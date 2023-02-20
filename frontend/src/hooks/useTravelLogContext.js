import { useContext } from "react"
import {TravelLogContext} from "../context/travelLogContext"

export const useTravelLogContext = () => {
  const context = useContext(TravelLogContext)

  if(!context){
    throw Error('out of context')
  }
  return context
}