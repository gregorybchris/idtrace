import "@/styles/globals.css";

import { Metadata } from "next";

const title = "idtrace example";
const description = "idtrace ID sharing example app.";

export const metadata: Metadata = {
  title,
  description,
  themeColor: "#FFF",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
