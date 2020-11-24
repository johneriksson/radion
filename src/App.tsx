import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

import "./App.css";
import { useUser } from "./hooks/useUser";

import Channels from "./pages/Channels";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";

function App() {
	const [user] = useUser();

	console.log("user", user);
	return (
		<Router>
			<div className="App">
				<header className="App-header">
					<div>
						<img
							className="logo"
							alt="Logo"
							src={`${process.env.PUBLIC_URL}/img/pepejam.gif`}
						></img>
						<h1>Radion</h1>
					</div>
					<div>
						<Link to="/">Channels</Link>
						{user?.username && (
							<>
								<Link to="/logout">Logout</Link>
							</>
						)}
						{!user?.username && (
							<>
								<Link to="/login">Login</Link>
								<Link to="/register">Register</Link>
							</>
						)}
					</div>
				</header>
				<div className="App-main">
					<Switch>
						<Route path="/" exact={true}>
							<Channels />
						</Route>

						<Route path="/register">
							<Register />
						</Route>
						<Route path="/login">
							<Login />
						</Route>
						<Route path="/logout">
							<Logout />
						</Route>
					</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;
