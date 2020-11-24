import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createClient, Provider } from "urql";

const client = createClient({
	// url: "http://192.168.10.128:4000/graphql",
	url: "http://localhost:4000/graphql",
	fetchOptions: {
		credentials: "include",
	},
});

ReactDOM.render(
	<React.StrictMode>
		<Provider value={client}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
