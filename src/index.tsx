import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createUrqlClient } from "./utils/createUrqlClient";
import { Provider } from "urql";

import "./index.css";

const client = createUrqlClient();

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
