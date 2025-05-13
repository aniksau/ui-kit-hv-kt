import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { HvButton, HvProvider } from "@hitachivantara/uikit-react-core";
import { Container } from "./components/common/Container";
import { Header } from "./components/common/Header";
import { NavigationProvider } from "./context/NavigationContext";

// import navigation from "./lib/navigation";

import "./lib/i18n";

import "virtual:uno.css";
import { RouterSetup } from "./Routes";

const name: string = 'Anik';
const num: number = 1;
const bool: boolean = true;

const App = () => (
  <Router>
    <HvProvider rootElementId="hv-root">
      <Container maxWidth="xl">
        <RouterSetup />
      </Container>
    </HvProvider>
  </Router>
);

export default App;