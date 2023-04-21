import { useEffect } from "react"
import { useCookies } from 'react-cookie'
import Wrapper from '../UI/Wrapper'
import profilePic from "/Images/profile_pic.jpg"
import { useNavigate } from "react-router-dom"

const ViewProfile = () => {

  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["accessToken"])

  const logOutUserHandler = () => {

    setCookies("accessToken", "")
    window.localStorage.removeItem("userInfo")
    navigate("/user/login")
  };

  const getUserProfileDataHandler = async () => {
    try {
      
      const dataFromServer = await fetch("http://localhost:5000/user/profile", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include"
      })

      // const aboutData = await dataFromServer.json()

      console.log(dataFromServer)

    } catch (error) {
        console.log(error)
    }

  };

  useEffect(() => {
    
    getUserProfileDataHandler()
  
  }, [])
  

  return (
    <Wrapper>

      <div className='view_profile_container'>
        <p>Profile Info</p>
        <h2>Sarvesh Soman</h2>

        <div className="details_container">
          <div className="profile_details_left">
            <div className="profile_img">
              <img src={profilePic} alt="Profile photo" />
            </div>
          </div>

          <div className="profile_details_right">
            
            <div className="firstName">
              <div><b>FirstName:- </b></div>
              <div>Sarvesh</div>
            </div>

            <div className="lastName">
              <div><b>Last Name:- </b></div>
              <div>Soman</div>
            </div>

            <div className="occupation">
              <div><b>Occupation:-</b></div>
              <div>Developer</div>
            </div>
            <div className="email">
              <div><b>Email:-</b></div>
              <div>sarveshsoman1809@gmail.com</div>
            </div>

            <div className="phone">
              <div><b>Phone:-</b></div>
              <div>9175891996</div>
            </div>


          </div>
        </div>

        <div className="log_out">
          <button id='logout_btn' onClick={logOutUserHandler}>LogOut</button>
        </div>
      </div>
    </Wrapper>
  )
}

export default ViewProfile