import { Routes, Route } from "fusion-plugin-react-router";
import { PAGES } from "./constants";
import HomePage from "./pages/HomePage";
import ComprehensiveTestPage from "./pages/ComprehensiveTestPage";

import { LightTheme, BaseProvider } from "baseui";
import Header from "./layout/Header";
import { Helmet } from "fusion-plugin-react-helmet-async";
import { assetUrl } from "fusion-core";

const styles = assetUrl('./styles.css')

export default function App() {
  return (
    <div>
      <Helmet>
        <title>Uber Comprehensive Test</title>
        <link rel="stylesheet" type="text/css" href={styles} />
        
      </Helmet>
      <BaseProvider theme={LightTheme}>
        <Header />
        <Routes>
          <Route path={PAGES.HOME_PAGE} element={<HomePage />} />
          <Route
            path={PAGES.COMPREHENSIVE_TEST_PAGE + "/:UUID"}
            element={<ComprehensiveTestPage />}
          />
        </Routes>
      </BaseProvider>
    </div>
  );
}
