import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { ToastProvider } from "@/context/ToastContext";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  const links = [
    { label: "Home", url: "/" },
    { label: "About", url: "/about" },
    { label: "Services", url: "/services" },
    { label: "Contact", url: "/contact" },
  ];
  return (
    <ToastProvider>
      {/* <Navbar links={links} /> */}

      <Component {...pageProps} />
    </ToastProvider>
  );
}
