import type { Metadata } from "next";

import './styled.global.scss';

import Header from "@/components/header";
import Footer from "@/components/footer";

import CarrinhoProvider from "@/contexts/carrinho";
import AuthProvider from "@/contexts/auth";
export const metadata: Metadata = {
  title: "Onfire",
  description: "Site oficial de comprar da onfire.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-br">
      <body>
        <CarrinhoProvider>
          <AuthProvider>
            <Header />
            {children}
            <Footer />
          </AuthProvider>
        </CarrinhoProvider>
      </body>
    </html>
  );
}
