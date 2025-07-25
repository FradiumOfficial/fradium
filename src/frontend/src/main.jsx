// Dependency
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation, useNavigationType } from "react-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Global Style
import "@/core/style/global.css";

// Canister Declarations
import { backend } from "declarations/backend";
import { token } from "declarations/token";
import { bitcoin } from "declarations/bitcoin";
import { solana } from "declarations/solana";

// Provider
import { AuthProvider } from "@/core/providers/auth-provider.jsx";

// Layouts
import HomeLayout from "@/core/components/layouts/home-layout.jsx";
import WalletLayout from "@/core/components/layouts/wallet-layout.jsx";

// Auth
import AuthGuard from "@/core/components/auth/auth-guard.jsx";

// Pages
import HomePage from "@/pages/home/home-page.jsx";
import NotFoundPage from "@/pages/SEO/not-found-page";
import ListReportPage from "@/pages/report/list-report-page.jsx";
import ReportPage from "@/pages/report/detail-report-page.jsx";
import CreateReportPage from "@/pages/report/create-report-page.jsx";
import FaucetPage from "@/pages/faucet-page.jsx";
import BalancePage from "@/pages/balance-page.jsx";
import MyReportPage from "@/pages/report/my-report-page.jsx";
import AssetsPage from "@/pages/wallet/asset-page.jsx";
import AnalyseAddressPage from "@/pages/wallet/analyze-address-page.jsx";
import AnalyseContractPage from "@/pages/wallet/analyze-contract-page.jsx";
import TransactionHistoryPage from "@/pages/wallet/transaction-history-page.jsx";
import ScanHistoryPage from "@/pages/wallet/scan-history-page.jsx";
import SettingPage from "@/pages/wallet/setting-page.jsx";
import ProductsExtension from "@/pages/products/products-extension.jsx";
import ProductsWallet from "@/pages/products/products-wallet.jsx";
import AssistantPage from "@/pages/assistant-page.jsx";

NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: false,
});

const customStyles = `
  #nprogress .bar {
    background: #10b981 !important;
    height: 3px !important;
  }
  #nprogress .peg {
    box-shadow: 0 0 10px #10b981, 0 0 5px #10b981 !important;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = customStyles;
document.head.appendChild(styleSheet);

function NProgressRouter() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    NProgress.start();

    const timer = setTimeout(() => {
      NProgress.done();
    }, 500);

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });

    return () => {
      clearTimeout(timer);
      NProgress.remove();
    };
  }, [location, navigationType]);

  return null;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <NProgressRouter />
      <AuthProvider canisters={{ backend, token, bitcoin, solana }}>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/balance" element={<BalancePage />} />
            <Route path="/reports" element={<ListReportPage />} />
            <Route path="/reports/create" element={<CreateReportPage />} />
            <Route path="/reports/:id" element={<ReportPage />} />
            <Route
              path="/my-report"
              element={
                <AuthGuard>
                  <MyReportPage />
                </AuthGuard>
              }
            />
            <Route path="/faucet" element={<FaucetPage />} />
            <Route path="/products" element={<ProductsExtension />} />
            <Route path="/products-wallet" element={<ProductsWallet />} />
            <Route path="/assistant" element={<AssistantPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route
            path="/wallet"
            element={
              <AuthGuard isRedirectToLogin>
                <WalletLayout />
              </AuthGuard>
            }>
            <Route index element={<AssetsPage />} />
            <Route path="analyze-address" element={<AnalyseAddressPage />} />
            <Route path="analyze-contract" element={<AnalyseContractPage />} />
            <Route path="transaction-history" element={<TransactionHistoryPage />} />
            <Route path="scan-history" element={<ScanHistoryPage />} />
            <Route path="setting" element={<SettingPage />} />
          </Route>
        </Routes>
      </AuthProvider>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </BrowserRouter>
  </StrictMode>
);
