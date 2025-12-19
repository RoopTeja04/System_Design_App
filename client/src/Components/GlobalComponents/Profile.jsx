import axios from 'axios';
import React from 'react';
import { CgProfile } from "react-icons/cg";

const Profile = () => {

    const userID = localStorage.getItem("UserID");

    const [profile, setProfile] = React.useState([]);

    React.useEffect(() => {
        fetchUserProfle();
    }, []);

    const fetchUserProfle = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/profile-service/profile/view-profile/${userID}`);
            if (res.status === 200) {
                console.log(res)
                const data = Array.isArray(res.data.data) ? res.data.data : [res.data.data]
                setProfile(data);
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className='border border-white'>
                {profile.map((data, index) => (
                    <div key={index}>
                        <div className="flex flex-row" >
                            <div>
                                {data.profilePic !== "" ? (
                                    <img src={data.profilePic} alt="profile" />
                                ) : (
                                    <CgProfile size={40} />
                                )}
                            </div>
                            <div>
                                <h1>{data.name}</h1>
                            </div>
                        </div>

                        <div>
                            <p>BIO: {data.bio}</p>
                        </div>
                    </div>

                ))}
            </div>
        </>
    )
}

export default Profile