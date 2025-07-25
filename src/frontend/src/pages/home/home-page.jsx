import React from "react";
import Button from "@/core/components/Button";
import ButtonBullet from "@/core/components/ButtonBullet";
import styles from "./home-page.module.css";
import { useNavigate } from "react-router";
import { useAuth } from "@/core/providers/auth-provider";
import { useState } from "react";
import SidebarButton from "@/core/components/SidebarButton";
import { backend } from "declarations/backend";
import { LoadingState } from "@/core/components/ui/loading-state";
import { useWallet } from "@/core/providers/wallet-provider";
import ConfirmCreateWalletModal from "@/core/components/modals/ConfirmCreateWalletModal";

const HomePage = () => {
  const { isAuthenticated, handleLogin } = useAuth();
  const navigate = useNavigate();
  const [showConfirmWalletModal, setShowConfirmWalletModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { hasConfirmedWallet, setHasConfirmedWallet } = useWallet();

  // Fungsi untuk handle launch wallet
  const handleLaunchWallet = async () => {
    setIsLoading(true);
    if (!isAuthenticated) {
      try {
        const customLoginHandler = async () => {
          // Setelah login, cek wallet
          const walletResult = await backend.get_wallet();
          if ("Ok" in walletResult) {
            // Wallet sudah ada, langsung redirect
            navigate("/wallet");
          } else if (!hasConfirmedWallet) {
            // Wallet belum ada dan belum konfirmasi, tampilkan modal konfirmasi
            setShowConfirmWalletModal(true);
          } else {
            // Sudah konfirmasi tapi belum ada wallet, langsung ke wallet page
            navigate("/wallet");
          }
          setIsLoading(false);
        };
        await handleLogin(customLoginHandler);
      } catch (error) {
        console.log("Login cancelled or failed");
        setIsLoading(false);
      }
    } else {
      // User sudah login, cek wallet
      try {
        const walletResult = await backend.get_wallet();
        if ("Ok" in walletResult) {
          // Wallet sudah ada, langsung redirect
          navigate("/wallet");
        } else if (!hasConfirmedWallet) {
          // Wallet belum ada dan belum konfirmasi, tampilkan modal konfirmasi
          setShowConfirmWalletModal(true);
        } else {
          // Sudah konfirmasi tapi belum ada wallet, langsung ke wallet page
          navigate("/wallet");
        }
      } catch (error) {
        console.error("Error checking wallet:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Fungsi untuk handle konfirmasi create wallet
  const handleConfirmCreateWallet = () => {
    setShowConfirmWalletModal(false);
    setHasConfirmedWallet(true);
    navigate("/wallet"); // Redirect ke wallet page untuk proses pembuatan wallet
  };

  return (
    <div className="mt-10">
      <section className={styles.heroAboutSection}>
        {/* Hero Content */}
        <div className={styles.heroContentWrapper}>
          {/* Ilustrasi kiri */}
          <img src="/assets/images/hero_kiri.png" alt="Blockchain Security Illustration" className={styles.heroIllustrationLeft} draggable="false" />
          {/* Ilustrasi kanan */}
          <img src="/assets/images/hero_kanan.png" alt="Digital Assets Security" className={styles.heroIllustrationRight} draggable="false" />
          <div className={styles.heroContent}>
            {/* Badge */}
            <span className={styles.heroBadge}>REINVENTED BLOCKCHAIN SECURITY</span>
            {/* Main Heading */}
            <h1 className={styles.heroTitle}>
              Protect every <span className="block" />
              transaction.
              <br />
              <span className={styles.heroTitleAccent}>Stay ahead of fraud.</span>
            </h1>
            {/* Subtitle */}
            <p className={styles.heroSubtitle}>
              Here is Your Digital Asset Guardian to <br /> Analyse. Protect. Transact with Confidence.
            </p>
            {/* CTA Button */}
            <div className="relative">
              <SidebarButton onClick={handleLaunchWallet} disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <LoadingState type="spinner" size="sm" color="primary" />
                    <span>Checking Wallet...</span>
                  </div>
                ) : (
                  "Launch Wallet →"
                )}
              </SidebarButton>
            </div>
            {/* Efek Glow di bawah button */}
            <div className={styles.aboutGlowBg}>
              <img src="/assets/images/glow.png" alt="Glow" className={styles.glowImg} />
            </div>
          </div>
        </div>
        {/* Konten About: label, judul besar, deskripsi, ilustrasi */}
        <div className={styles.aboutContent}>
          <div className={styles.aboutLabel}>ABOUT FRADIUM</div>
          <h2 className={styles.aboutTitle}>Built to Secure Every Transaction</h2>
          <p className={styles.aboutDesc}>
            Fradium is a Web3 security platform dedicated to safeguarding digital asset transactions. We enable users to analyse wallet addresses and audit smart contracts before interacting with them.
            <br />
            Our mission: help you detect risks, avoid fraud, and engage with confidence across the blockchain ecosystem.
          </p>
          <div className={styles.aboutIllus}>
            <img src="/assets/images/illus.png" alt="Fradium About Illustration" />
          </div>
        </div>
      </section>
      {/* How it works section */}
      <section className="w-full flex flex-col items-center mt-24 px-4">
        <div className="text-center mb-6">
          <div className="text-green-400 font-semibold tracking-widest text-sm mb-2">HOW IT WORKS</div>
          <h2 className="text-4xl md:text-5xl font-medium text-white mb-4">Simple Protection for Every Transaction</h2>
          <p className="text-[#B0B6BE] text-lg max-w-4xl mx-auto">
            Fradium simplifies blockchain security with two essential tools: address analysis and smart contract audit.
            <br className="hidden md:block" />
            The process is designed to be clear, quick, and reliable.
          </p>
        </div>
        <div
          className="relative bg-[#181C22]/80 rounded-3xl shadow-lg overflow-hidden mx-auto"
          style={{
            width: "calc(100vw - 100px)",
            maxWidth: "1400px",
            margin: "0 auto",
            height: "292px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            border: "1.5px solid rgba(255,255,255,0.10)",
            borderRadius: "24px",
            boxSizing: "border-box",
          }}>
          <img
            src="/assets/graph-stepper.png"
            alt="How it works"
            style={{
              width: "100%",
              height: "128%",
              display: "block",
              objectFit: "contain",
            }}
            draggable="false"
          />
          {/* Overlay step content */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {/* Step 1 */}
            <div
              className="absolute text-center"
              style={{
                top: "165px",
                left: "18.5%",
                transform: "translateX(-50%)",
                width: "260px",
              }}>
              <div className="text-white text-xl font-medium mb-2">Step 1</div>
              <div className="text-[#B0B6BE] text-base">Enter the wallet address or smart contract you wish to review</div>
            </div>
            {/* Step 2 */}
            <div
              className="absolute text-center"
              style={{
                top: "155px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "260px",
              }}>
              <div className="text-white text-xl font-medium mb-2">Step 2</div>
              <div className="text-[#B0B6BE] text-base">Fradium checks against fraud databases and performs risk analysis.</div>
            </div>
            {/* Step 3 */}
            <div
              className="absolute text-center"
              style={{
                top: "155px",
                left: "81.5%",
                transform: "translateX(-50%)",
                width: "260px",
              }}>
              <div className="text-white text-xl font-medium mb-2">Step 3</div>
              <div className="text-[#B0B6BE] text-base">Get a risk score and actionable recommendations instantly.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Fradium Extension Section */}

      {/* KEY FEATURE SECTION */}
      <section className={styles.keyFeatureSection}>
        <div className={styles.keyFeatureHeader}>
          <span className={styles.keyFeatureLabel}>KEY FEATURE</span>
          <h2 className={styles.keyFeatureTitle}>Secure your digital assets with confidence</h2>
        </div>
        <div className={styles.keyFeatureContentWrapper}>
          {/* Fitur kiri atas */}
          <div className={`${styles.keyFeatureItem} ${styles.keyFeatureItemLeftTop}`}>
            <img src="/assets/images/icon-detecion.png" alt="Fraud Detection" className={styles.keyFeatureIcon} />
            <div>
              <div className={styles.keyFeatureItemTitle}>Fraud Detection</div>
              <div className={styles.keyFeatureItemDesc}>
                Map the crypto projects
                <br />
                Identify wallet risks before any transaction
              </div>
            </div>
          </div>
          {/* Fitur kiri bawah */}
          <div className={`${styles.keyFeatureItem} ${styles.keyFeatureItemLeftBottom}`}>
            <img src="/assets/images/icon-wallet.png" alt="Fradium Wallet" className={styles.keyFeatureIcon} />
            <div>
              <div className={styles.keyFeatureItemTitle}>Fradium Wallet</div>
              <div className={styles.keyFeatureItemDesc}>
                Prevent high-risk transactions
                <br />
                with real-time alerts
              </div>
            </div>
          </div>
          {/* Fitur kanan atas */}
          <div className={`${styles.keyFeatureItem} ${styles.keyFeatureItemRightTop}`}>
            <img src="/assets/images/icon-audit.png" alt="Smart Contract Audit" className={styles.keyFeatureIcon} />
            <div>
              <div className={styles.keyFeatureItemTitle}>Smart Contract Audit</div>
              <div className={styles.keyFeatureItemDesc}>
                Scan contracts for
                <br />
                vulnerabilities automatically
              </div>
            </div>
          </div>
          {/* Fitur kanan bawah */}
          <div className={`${styles.keyFeatureItem} ${styles.keyFeatureItemRightBottom}`}>
            <img src="/assets/images/icon-community.png" alt="Community Reporting" className={styles.keyFeatureIcon} />
            <div>
              <div className={styles.keyFeatureItemTitle}>Community Reporting</div>
              <div className={styles.keyFeatureItemDesc}>
                Submit and validate fraud
                <br />
                cases collaboratively
              </div>
            </div>
          </div>
          {/* Gambar utama wallet */}
          <div className={styles.keyFeatureImageWrapper}>
            <img src="/assets/images/fradium-wallet.png" alt="Fradium Wallet" className={styles.keyFeatureImage} draggable="false" />
          </div>
        </div>
      </section>

      {/* Confirm Create Wallet Modal */}
      <ConfirmCreateWalletModal isOpen={showConfirmWalletModal} onOpenChange={setShowConfirmWalletModal} onConfirm={handleConfirmCreateWallet} isLoading={isLoading} />
    </div>
  );
};

export default HomePage;
