import {useState} from "react";
import './App.css';
// import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Users from "./components/Users";
import Timesheet from "./components/Timesheet";
import CreateUser from "./components/CreateUser";
import Login from "./components/Login";
// import Temp from "./components/Temp";

function App() {
	
	return (
		<Router>
				<div className="app">
				<Routes>
					<Route path="/login" element={<Login/>} />
					<Route path="/users/:userId" element={<Timesheet/>} />
					<Route path="/users/create" element={<CreateUser/>} />
					<Route path="/" element={<Users/>} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
