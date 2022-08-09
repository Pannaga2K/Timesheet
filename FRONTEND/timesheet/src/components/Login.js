import {useState, useEffect} from "react";
import "./Login_Create.css";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const [userDetails, setUserDetails] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleInputs = (e) => {
        e.preventDefault();
        setUserDetails((oldState) => ({
            ...oldState,
            [e.target.name]: e.target.value,
        }))
    }

    const loginUser = () => {
        if(userDetails.username != "" || userDetails.password != "") {
            axios.post("login", {details: userDetails}).then((res) => {
                console.log(res);
                if(res.data.username) {
                    sessionStorage.setItem("currentUser", JSON.stringify({username: res.data.username, userId: res.data.userId}));
                    navigate('/');
                } else {
                    alert("INVALID CREDENTIALS!");
                }
            })
        } else {
            alert("FILL ALL THE DETAILS");
        }
    }

    return (
        <div className="login" >
            <h1>LOGIN</h1>
            <div className="login__form" >
                <input type="text" name="username" placeholder="Username" value={userDetails.username} onChange={(e) => handleInputs(e)} />
                <input type="password" name="password" placeholder="Password" value={userDetails.password} onChange={(e) => handleInputs(e)} />
                <button onClick={() => loginUser()} >SUBMIT</button>
            </div>
        </div>
    );
}

export default Login;