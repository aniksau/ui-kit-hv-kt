import { BrowserRouter as Router } from "react-router-dom";
import { HvProvider } from "@hitachivantara/uikit-react-core";
import "virtual:uno.css";
import { RouterSetup } from "./Routes";
import { Provider } from "react-redux";
import { store } from "./store/store";

const App = () => (
  <Provider store={store}>
    <Router>
      <HvProvider rootElementId="hv-root">
        <RouterSetup />
      </HvProvider>
    </Router>
  </Provider>
);

export default App;