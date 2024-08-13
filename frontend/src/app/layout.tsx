import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";

import './styled.global.scss';
import 'react-toastify/dist/ReactToastify.css';

import Header from "@/components/header";
import Footer from "@/components/footer";

import CarrinhoProvider from "@/contexts/carrinho";
import AuthProvider from "@/contexts/auth";

export const metadata: Metadata = {
  title: "On fire",
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
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable={false}
              pauseOnHover={false}
              theme="dark"
            />
            {children}
            <Footer />
          </AuthProvider>
        </CarrinhoProvider>
      </body>
    </html>
  );
}
