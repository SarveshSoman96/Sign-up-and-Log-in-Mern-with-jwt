import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='error_container'>
        <h1>OOPs! Something wrong occured</h1>
        <Link to="/">Got to home page</Link>
    </div>
  )
}

export default ErrorPage