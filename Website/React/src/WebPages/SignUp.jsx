import Header from './Header.jsx';
import '../App.css'
import './SignUp.css'

function SignUp() {
    return(
        <>
            <Header /> 

            <div className='SignUpContainer'>
                <h2 className='signUpH2'>Sign Up</h2>

                <form action="/signup" method='POST'>
                    <label className='headingName' htmlFor="firstname">First Name</label>
                    <input className='inputFields' type="text" id='firstname' placeholder='First Name' required/>
                    <label className='headingName' htmlFor="lastname">Last Name</label>
                    <input className='inputFields' type="text" id='lastname' placeholder='Last Name' required/>
                    <label className='headingName' htmlFor="username">username</label>
                    <input className='inputFields' id='username' type="text" placeholder='Enter username' required/>
                    <label className='headingName' htmlFor="password">password</label>
                    <input className='inputFields' id='password' type="password" placeholder='Enter Password' required/>
                    <button className='signUpBtn'>Sign Up</button>
                </form>
            </div>
        </>
    );
}

export default SignUp;