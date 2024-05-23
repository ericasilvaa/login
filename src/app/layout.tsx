import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Configuração da fonte Inter do Google Fonts
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lotus Alfaiataria - Login",
  description: "Cadastre-se no site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Contêiner principal que abrange toda a altura da tela */}
        <div className="relative min-h-screen">
          {/* Imagem de fundo */}
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: "url('/background_2.jpg')" }} 
          ></div>
          
          {/* Contêiner para o conteúdo principal */}
          <div className="relative z-10 min-h-screen flex items-center justify-center">
            {children} {/* Renderiza os componentes filhos passados para o layout */}
          </div>
        </div>
      </body>
    </html>
  );
}
