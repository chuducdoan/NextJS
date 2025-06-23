import ThemeRegistry from "@/components/theme-registry/theme.registry";
import NextAuthWrapper from "@/lib/next.auth.provider";
import { TrackContextProvider } from "@/lib/track.wrapper";
import { ToastProvider } from "@/utils/toast";
import * as React from "react";
import '@/styles/app.css';
import { Metadata } from "next";
import Image from "next/image";
import ImageTest from '../../public/demo.jpg';
import NProgressWrapper from "@/lib/nprogress.wrapper";

export const metadata: Metadata = {
  title: 'Tieu de from layout',
  description: 'mieu ta layout'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <NProgressWrapper>
            <NextAuthWrapper>
              <ToastProvider>
                <TrackContextProvider>{children}</TrackContextProvider>
              </ToastProvider>
            </NextAuthWrapper>
          </NProgressWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
