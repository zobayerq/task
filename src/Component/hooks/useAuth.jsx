import { useContext } from "react"
import { AuthContext } from "../AugthProvider/AugthProvider"


const useAuth = () => {
  const auth = useContext(AuthContext)
  return auth
}

export default useAuth
