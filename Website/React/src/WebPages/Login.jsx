import Header from './Header.jsx';
import { Link } from 'react-router-dom';
import '../App.css'
import './Login.css'
import axios from 'axios';

function Login() {
    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await axios.post("http://localhost:8080/api/account/login",{email,password});

            localStorage.setItem("token", response.data.token);
            window.location.href = "/";
        } catch (error) { console.log("Login Failed",error);
        }

    };


    return(
        <>
            <Header /> 

            <div className='loginContainer'>
                <h2 className='signInH2'>Login</h2>
                <form action="/login" method='POST' onSubmit={handleLogin}>
                    <label className='signIns' htmlFor="email">Email</label>
                    <input className='signInInputs' id='email' type="text" placeholder='Enter Email' />
                    <label className='signIns' htmlFor="password">password</label>
                    <input className='signInInputs' id='password' type="password" placeholder='Enter Password'/>
                    <button className='logInBtn' type="submit">Login</button>
                </form>
                <Link to="/signup">
                    <button className='signupBtn'>Sign Up</button>
                </Link>
            </div>
        </>
    );
}

export default Login;