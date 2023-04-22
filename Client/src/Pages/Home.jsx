import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home_container'>

      <p>Hello, Im Sarvesh Soman</p>
      <h2>Web Developer</h2>
      <p>Simple project created in MERN stack with form validation using <br /> react-hook-form, yup, JWT auth</p>
      <Link to="/user/login">Log In</Link>
    </div>
  )
}

export default Home;