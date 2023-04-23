import { useEffect , useState } from "react";
import { useCookies } from "react-cookie";
import Wrapper from "../UI/Wrapper";
import profilePic from "/Images/profile_pic.jpg";
import { useNavigate } from "react-router-dom";

const ViewProfile = () => {
  const navigate = useNavigate();
  const [cookies, _, removeCookie] = useCookies(["accessToken"]);
  const [userInfo, setUserInfo] = useState({});

  const logOutUserHandler = () => {
    removeCookie("accessToken", "");
    window.localStorage.removeItem("userInfo");
    navigate("/user/login");
  };

  const getUserProfileDataHandler = async () => {
    try {
      const dataFromServer = await fetch("http://localhost:5000/user/profile", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${cookies.accessToken}`,
        },
      });

      const aboutData = await dataFromServer.json();

      setUserInfo(aboutData);

    } catch (error) {
        console.log(error);
    }
  };

  useEffect(() => {

    if(cookies.accessToken){

      getUserProfileDataHandler();
    }
    else{
      alert("You are not logged in yet! Log in or Sign up first")
      navigate("/user/login");
    }


  }, []);

  return (
    <Wrapper>
      <div className="view_profile_container">
        {!userInfo.firstName ? (
          <p>Loading your profile data.</p>
        ) : (
          <>
            <p>Profile Info</p>
            <h2>{`${userInfo.firstName.charAt(0).toUpperCase() + userInfo.firstName.slice(1)} ${userInfo.lastName.charAt(0).toUpperCase() + userInfo.lastName.slice(1)}`}</h2>

            <div className="details_container">
              <div className="profile_details_left">
                <div className="profile_img">
                  <img src={profilePic} alt="Profile photo" />
                </div>
              </div>

              <div className="profile_details_right">
                <div className="firstName">
                  <div>
                    <b>FirstName:- </b>
                  </div>
                  <div>{userInfo.firstName.charAt(0).toUpperCase() + userInfo.firstName.slice(1)}</div>
                </div>

                <div className="lastName">
                  <div>
                    <b>Last Name:- </b>
                  </div>
                  <div>{userInfo.lastName.charAt(0).toUpperCase() + userInfo.lastName.slice(1)}</div>
                </div>

                <div className="occupation">
                  <div>
                    <b>Occupation:-</b>
                  </div>
                  <div>{userInfo.Occupation}</div>
                </div>
                <div className="email">
                  <div>
                    <b>Email:-</b>
                  </div>
                  <div>{userInfo.userEmailAddress}</div>
                </div>

                <div className="phone">
                  <div>
                    <b>Phone:-</b>
                  </div>
                  <div>{userInfo.phone}</div>
                </div>
              </div>
            </div>

            <div className="log_out">
              <button id="logout_btn" onClick={logOutUserHandler}>
                LogOut
              </button>
            </div>
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default ViewProfile;
