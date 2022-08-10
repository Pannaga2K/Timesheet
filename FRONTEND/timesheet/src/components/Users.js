import {useState, useEffect} from "react";
import './Users.css';
import axios from "../axios";
import { Link } from 'react-router-dom';

function Users() {

	const [users, setUsers] = useState([]);
	const [isDeleted, setIsDeleted] = useState(false);
	const [currentUserDetails, setCurrentUserDetails] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		if(JSON.parse(sessionStorage.getItem("currentUser"))) {
			setCurrentUserDetails({username: JSON.parse(sessionStorage.getItem("currentUser")).username, userId: JSON.parse(sessionStorage.getItem("currentUser")).userId});
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
		axios.get("users").then((res) => {
			setUsers(res.data);
		});
	}, [isDeleted, isLoggedIn]);
	
	const deleteUser = (user) => {
		axios.delete(`users/delete/${user?.userId}`).then((res) => {
			console.log(res);
			setIsDeleted(!isDeleted);
		});
	}

	const logout = () => {
		setIsLoggedIn(false);
		sessionStorage.removeItem("currentUser");
	}

	return (
		<div className="app">
			<div className="app__login" >
				<div className="app__header" >
					<h1>TIMESHEET</h1>
				</div>
				<div className="app__auth" >
					{!isLoggedIn ? <Link to="/login" ><h2>LOGIN/SIGNUP</h2></Link> : <h2 onClick={() => logout()} >LOGOUT</h2>}
				</div>
			</div>
			<div className="app__users" >
				{users?.map((u) => (
					<div className="app__usersCard" >
						{/* <div className="app__userName" >
							<p>{u?.username[0].toUpperCase()}</p>
						</div> */}
						<div className="app__users-metadata" >
							{/* META_DATA */}
							<p>{u?.username}</p>
							<p>{u?.email_Id}</p>
						</div>
						{isLoggedIn && currentUserDetails?.username == u?.username && 
							<div className="app__buttons" >
								<button>
									<Link to={`/users/${u?.userId}`} >VIEW</Link>
								</button>
								<button onClick={() => deleteUser(u)} >DELETE</button>
							</div>
						}
					</div>
				))}
				<Link to="/users/create" >
					<div className="app__createUserCard" >
						<div className="app__createUser-icon" >
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16"> <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/> </svg>
						</div>
					</div>
				</Link>
			</div>
		</div>
	);
}

export default Users;
