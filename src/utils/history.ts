import { createBrowserHistory } from "history";
import { LocationState } from "./locationState";

const history = createBrowserHistory<LocationState>();
export default history;