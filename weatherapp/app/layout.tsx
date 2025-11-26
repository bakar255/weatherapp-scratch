import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-linear-to-t from to-blue-500 to bg-cyan-500">
        {children}
      </body>
    </html>
  );
}
