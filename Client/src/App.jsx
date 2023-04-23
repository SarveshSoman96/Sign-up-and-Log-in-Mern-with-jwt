import './App.css';
import { Routes , Route, useNavigate} from "react-router-dom";
import { useEffect } from "react";
import LogInForm from './Pages/LogInForm';
import SignUpForm from './Pages/SignUpForm';
import ViewProfile from './Pages/ViewProfile';
import Home from './Pages/Home';
import ErrorPage from './Pages/ErrorPage';
import WelcomeUser from './Pages/WelcomeUser';

function App() {

  

  return (
    <>
    <div className="container">
      {/* <Wrapper> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user/login' element={<LogInForm />} />
          <Route path='/user/signup' element={<SignUpForm />}/>
          <Route path='/user/profile' element={<ViewProfile />}/>
          <Route path='/user/welcome' element={<WelcomeUser />}/>
          <Route path='*' element={<ErrorPage />}/>
        </Routes>
      {/* </Wrapper> */}
    </div>
        
    

    </>
  )
}

export default App
