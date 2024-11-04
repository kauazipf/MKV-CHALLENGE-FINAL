import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MKV-Challenge",
  description:
    "Projeto Porto-Seguro.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
