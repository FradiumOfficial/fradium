import Home from "./modules/home/pages/Home"
import { ThemeProvider } from "./components/ui/theme-provider"
import AnalyzeAddress from "./modules/analyze_address/pages/AnalyzeAdress"
import AnalyzeSmartContract from "./modules/analyze_smartcontract/pages/AnalyzeSmartContract"
import AnalyzeSmartContractResult from "./modules/analyze_smartcontract/pages/AnalyzeSmartContractResult"
import AnalyzeSmartContractProgress from "./modules/analyze_smartcontract/pages/AnalyzeSmartContractProgress"
import { Route, Routes } from "react-router-dom"
import { ROUTES } from "./constants/routes"
import AnalyzeAdressResult from "./modules/analyze_address/pages/AnalyzeAddressResult"
import DetailHistory from "./modules/history/pages/DetailHistory"
import History from "./modules/history/pages/History"
import AnalysisProgress from "./modules/analyze_address/pages/AnalyzeProgress"
import Failed from "./modules/SEO/Failed"
import AnalyzeAddressCommunityResult from "./modules/analyze_address/pages/AnalyzeAddressCommunityResult"

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ANALYZE_ADDRESS} element={<AnalyzeAddress />} />
        <Route path={ROUTES.ANALYZE_SMART_CONTRACT} element={<AnalyzeSmartContract />} />
        <Route path={ROUTES.ANALYZE_ADDRESS_RESULT} element={<AnalyzeAdressResult />} />
        <Route path={ROUTES.ANALYZE_SMART_CONTRACT_RESULT} element={<AnalyzeSmartContractResult />} />
        <Route path={ROUTES.ANALYZE_SMART_CONTRACT_PROGRESS} element={<AnalyzeSmartContractProgress />} />
        <Route path={ROUTES.HISTORY} element={<History />} />
        <Route path={ROUTES.DETAIL_HISTORY} element={<DetailHistory />} />
        <Route path={ROUTES.ANALYZE_PROGRESS} element={<AnalysisProgress />} />
        <Route path={ROUTES.FAILED} element={<Failed />} />
        <Route path={ROUTES.ANALYZE_ADDRESS_COMMUNITY_RESULT} element={<AnalyzeAddressCommunityResult />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App