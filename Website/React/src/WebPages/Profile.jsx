import { useNavigate } from "react-router-dom"; 
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import './Profile.css';

function Profile({ setWishList, setIsAuthenticated }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        setWishList([]);
        setIsAuthenticated(false);
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
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data)
                setLoading(false);
            } catch (error) {
                console.log(error, "error fetcing Profile Details");
                if (error.response?.status === 401 || error.response?.status === 403) {
                    localStorage.removeItem("token");
                    navigate("/login");
                } else {
                    setError("Error fetching User Details...")
                    setLoading(false);
                }
            }
        };
        fetchProfile();
    },[navigate]);

    if (!user) {
        return <p>Loading Profile...</p>
    }
    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>{error}</p>
    }

    return (
        <>                  
            <Header />

            <div className="profileInfo">
                <div className="headingAndBtn">
                    <h2 className="profileDetailsh3" >Profile Details</h2>
                    <button className="editProfileBtn">Edit Profile</button>
                </div>
                <p className="userDetails" >First Name : {user.firstName}</p>
                <p className="userDetails">Last Name : {user.lastName}</p>
                <p className="userDetails">Email : {user.email}</p>
                <p className="userDetails">Date of Birth : {user.dob}</p>
                <p className="userDetails">Address : {user.address}</p>
                <button className="changePassBtn">Change Password</button>
                <button onClick={handleLogout} className="logoutBtn">Logout</button>
            </div>
        </>
    );
}

export default Profile;