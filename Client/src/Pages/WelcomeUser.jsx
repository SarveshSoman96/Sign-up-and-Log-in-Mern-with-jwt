import { useEffect, useState } from 'react';
import { Link , useNavigate} from "react-router-dom";
import Wrapper from '../UI/Wrapper';

const WelcomeUser = () => {

  const navigate = useNavigate();

  const [userData, setUserName] = useState(null)


  useEffect(() => {
    
    const storedData = (JSON.parse(window.localStorage.getItem("userInfo")))

    if(storedData) {
      setUserName(storedData)

    } 
    else{
      navigate("/user/login")
    }

  }, [])
  

  return (
    <Wrapper>
      <div className="welcome_container">
        {!userData ? (
          <p>Loading..</p>
        ) : (
          <>
            <h2>Welcome {userData.userName.charAt(0).toUpperCase() + userData.userName.slice(1)}</h2>
            <Link to="/user/profile" id="viewprofile">
              View profile
            </Link>
          </>
        )}
      </div>
    </Wrapper>
  );
}

export default WelcomeUser