import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import { Provider, createClient } from "urql";

import "./App.css";

import Channels from "./pages/Channels";
import Register from "./pages/Register";

const client = createClient({
	url: "http://localhost:4000/graphql",
	fetchOptions: {
		credentials: "include",
	},
});

function App() {
	return (
		<Provider value={client}>
			<Router>
				<div className="App">
					<header className="App-header">
						<div>
							<img className="logo" src={`${process.env.PUBLIC_URL}/img/pepejam.gif`}></img>
							<h1>Radion</h1>
						</div>
						<div>
							<Link to="/">Channels</Link>
							<Link to="/register">Register</Link>
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
						</Switch>
					</div>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
