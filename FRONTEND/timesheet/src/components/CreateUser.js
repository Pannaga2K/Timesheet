import {useState, useEffect} from "react";
import "./CreateUser.css";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

function CreateUser() {
    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        phone: "",
        doj: ""
    });
    const navigate = useNavigate();

    const handleInputs = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setUserDetails((oldState) => ({
            ...oldState,
            [e.target.name]: e.target.value,
        }))
    }

    const createUser = () => {
        if(userDetails.username != "" || userDetails.email != "" || userDetails.phone != "" || userDetails.doj != "") {
            axios.post("users/create", {details: userDetails}).then((res) => {
                console.log(res);
                navigate('/');
            })
        } else {
            alert("FILL ALL THE DETAILS");
        }
    }

    console.log(userDetails);

    return (
        <div className="createUser" >
            <h1>CREATE USER</h1>
            <div className="createUser__form" >
                <input type="text" name="username" value={userDetails.username} onChange={(e) => handleInputs(e)} />
                <input type="text" name="email" value={userDetails.email} onChange={(e) => handleInputs(e)} />
                <input type="text" name="phone" value={userDetails.phone} onChange={(e) => handleInputs(e)} />
                <input type="text" name="doj" value={userDetails.doj} onChange={(e) => handleInputs(e)} />
                <button onClick={() => createUser()} >SUBMIT</button>
            </div>
        </div>
    )
}

export default CreateUser;