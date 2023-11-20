import "./styles.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { PAGES } from "./constants";
import HomePage from "./pages/HomePage";
import ComprehensiveTestPage from "./pages/ComprehensiveTestPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PAGES.HOME_PAGE} Component={HomePage} />
        <Route
          path={PAGES.COMPREHENSIVE_TEST_PAGE + "/:id"}
          Component={ComprehensiveTestPage}
        />
      </Routes>
    </BrowserRouter>
  );
}
