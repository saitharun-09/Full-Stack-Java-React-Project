import Header from "./Header";

function Profile() {
    return (
        <>                  
            <Header />

            <div className="profileInfo">
                <button>Edit Profile</button>
                <P>First Name : </P>
                <p>Last Name :</p>
                <p>Email :</p>
                <p>Date of Birth : </p>
                <p>Address : </p>
                <button>Change Password</button>
                <button>Logout</button>
            </div>
        </>
    );
}

export default Profile;