import AppFooter from "@/components/footer/app.footer";
import AppHeader from "@/components/header/app.header";
import Script from "next/script";
import * as React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppHeader />
      {children}
      <div style={{marginBottom: '100px'}}></div>
      <AppFooter />
      {/* <Script src="https://example.com/script.js" /> */}
    </>
  );
}
