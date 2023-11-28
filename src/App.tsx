import "./styles.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { PAGES } from "./constants";
import HomePage from "./pages/HomePage";
import ComprehensiveTestPage from "./pages/ComprehensiveTestPage";

import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import Header from "./layout/Header";

const engine = new Styletron();

export default function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path={PAGES.HOME_PAGE} Component={HomePage} />
            <Route
              path={PAGES.COMPREHENSIVE_TEST_PAGE + "/:UUID"}
              Component={ComprehensiveTestPage}
            />
          </Routes>
        </BrowserRouter>
      </BaseProvider>
    </StyletronProvider>
  );
}
