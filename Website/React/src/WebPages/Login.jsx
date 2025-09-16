import Header from './Header.jsx';
import { Link } from 'react-router-dom';
import '../App.css'
import './Login.css'

function Login() {
    return(
        <>
            <Header /> 

            <div className='loginContainer'>
                <h2 className='signInH2'>Login</h2>
                <form action="/login" method='POST'>
                    <label className='signIns' htmlFor="username">username</label>
                    <input className='signInInputs' id='username' type="text" placeholder='Enter username' />
                    <label className='signIns' htmlFor="password">password</label>
                    <input className='signInInputs' id='password' type="password" placeholder='Enter Password'/>
                    <button className='logInBtn'>Login</button>
                </form>
                <Link to="/signup">
                    <button className='signupBtn'>Sign Up</button>
                </Link>
            </div>
        </>
    );
}

export default Login;