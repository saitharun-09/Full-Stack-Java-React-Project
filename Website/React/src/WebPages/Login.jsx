import Header from './Header.jsx';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import '../App.css'
import './Login.css'
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await axios.post("http://localhost:8085/api/account/login",{email,password});

            localStorage.setItem("token", response.data.token);
            navigate ("/");
        } catch (error) { 
            console.error("Login Failed", error.response?.data || error.message);
            alert("Login failed!");
        }
    };

    return(
        <>
            <Header /> 

            <div className='loginContainer'>
                <h2 className='signInH2'>Login</h2>
                <form onSubmit={handleLogin}>
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