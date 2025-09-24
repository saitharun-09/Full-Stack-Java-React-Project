import { useNavigate } from "react-router-dom"; 
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
    
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }
                const response = await axios.get("http://localhost:8085/api/account/profile", {
                    headers: { Authorization: `Bearer${token}`,},
                });
                setUser(response.data)
            } catch (error) {
                console.log(error, "error fetcing Profile Details");
                navigate("/login");
            }
        };
        fetchProfile();
    },[navigate]);

    if (!user) {
        return <p>Loading Profile...</p>
    }

    return (
        <>                  
            <Header />

            <div className="profileInfo">
                <button className="editProfileBtn">Edit Profile</button>
                <p className="userDetails" >First Name : {user.firstName}</p>
                <p className="userDetails">Last Name : {user.lastName}</p>
                <p className="userDetails">Email : {user.email}</p>
                <p className="userDetails">Date of Birth : {user.Dob}</p>
                <p className="userDetails">Address : {user.address}</p>
                <button>Change Password</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </>
    );
}

export default Profile;