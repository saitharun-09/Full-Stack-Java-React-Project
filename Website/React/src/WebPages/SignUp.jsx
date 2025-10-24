import Header from './Header.jsx';
import '../App.css'
import './SignUp.css'
import axios from 'axios';
import { useState } from 'react';

function SignUp() {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(""); 

    const handleSignup = async (e) => {
        e.preventDefault();
        
        const firstName = e.target.firstname.value;
        const lastName = e.target.lastname.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await axios.post("http://localhost:8080/api/account/signup",
                    {firstName,lastName,email,password});
                if ( response.status === 200) {
                    setSuccess(true)
                }
            window.location.href = "/login";
        }catch (error) {
            console.log("Error Sign Up", error)
            setError("Signup failed. Try again.");

        }
    }

    return(
        <>
            <Header /> 

            <div className='SignUpContainer'>
                <h2 className='signUpH2'>Sign Up</h2>
                {success ? (
                    <div>
                        <p>User Registered!</p>
                        <a href="/login"> Go to Login Page</a>
                    </div>
                    ) : (
                    <form onSubmit={handleSignup}>
                        <label className='headingName' htmlFor="firstname">First Name</label>
                        <input className='inputFields' type="text" id='firstname' placeholder='First Name' required/>
                        <label className='headingName' htmlFor="lastname">Last Name</label>
                        <input className='inputFields' type="text" id='lastname' placeholder='Last Name' required/>
                        <label className='headingName' htmlFor="email">Email</label>
                        <input className='inputFields' id='email' type="text" placeholder='Enter Email' required/>
                        <label className='headingName' htmlFor="password">password</label>
                        <input className='inputFields' id='password' type="password" placeholder='Enter Password' required/>
                        <button className='signUpBtn' type='submit'>Sign Up</button>

                        {error && <p className="text-red-600 mt-2">{error}</p>}
                    </form>)
                }   
            </div>
        </>
    );
}

export default SignUp;