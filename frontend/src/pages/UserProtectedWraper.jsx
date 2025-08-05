import { useContext, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from 'axios'
const UserProtectedWraper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
        navigate('/')
    } else {
      axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
      }).then(response => {
        if(response.status === 200) {
          setUser(response.data)  
          setIsLoading(false)
        }
      }).catch(error => {
        console.error(error)
        localStorage.removeItem('token')
        navigate('/')
      })
    }
  }, [token, navigate, setUser])


  return(
    <>
        { !isLoading && children }
    </>
  )


};

export default UserProtectedWraper;
