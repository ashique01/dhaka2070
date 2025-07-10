import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-web3-dark-bg bg-premium-dark text-web3-text-primary font-sans">
      <Navbar />

      <main className="flex-grow w-full py-0">
        {children}
      </main>

      <Footer />
    </div>
  );
}