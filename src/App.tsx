import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

import "./App.css";
import { useLogoutMutation } from "./generated/graphql";
import { useUser } from "./hooks/useUser";
import ChangePassword from "./pages/ChangePassword";

import Channels from "./pages/Channels";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
	const [user, setUser] = useUser();
	const [, logout] = useLogoutMutation();

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
						<h1>radion</h1>
					</div>
					<div>
						<Link to="/">Channels</Link>
						{user?.username && (
							<>
								<Link
									to="/"
									onClick={async (e) => {
										e.preventDefault();
										await logout();
										setUser(null);
									}}
								>
									Logout
								</Link>
								<span className="username">{user.username}</span>
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
						<Route path="/forgot-password">
							<ForgotPassword />
						</Route>
						<Route path="/change-password/:token">
							<ChangePassword />
						</Route>
					</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;
