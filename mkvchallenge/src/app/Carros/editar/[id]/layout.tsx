import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editar | MKV-Challenge",
  description: "Pagina para Editar Carros",
  keywords: "carros, editar",
};

export default function EditarCarrosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
