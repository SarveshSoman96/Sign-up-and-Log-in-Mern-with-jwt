import './App.css';
import { Routes , Route, useNavigate} from "react-router-dom";
import { useEffect } from "react";
import LogInForm from './Pages/LogInForm';
import SignUpForm from './Pages/SignUpForm';
import ViewProfile from './Pages/ViewProfile';
// import Home from './Pages/Home';
import Wrapper from './UI/Wrapper';

function App() {

  const navigate = useNavigate()

  useEffect(() => {

    navigate("/user/login")
 
  }, [])
  

  return (
    <>
    <div className="container">
      <Wrapper>
        <Routes>
          {/* <Route path='/' element={<Home />} /> */}
          <Route path='/user/login' element={<LogInForm />} />
          <Route path='/user/signup' element={<SignUpForm />}/>
          <Route path='/user/profile' element={<ViewProfile />}/>
        </Routes>
      </Wrapper>
    </div>
        
    

    </>
  )
}

export default App
