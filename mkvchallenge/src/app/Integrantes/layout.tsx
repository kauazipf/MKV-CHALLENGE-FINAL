import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Integrantes | MKV-Challenge",
  description: "Integrantes page",
  keywords: "integrantes, mkvchallenge",
};

export default function IntegrantesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
