import "./globals.css";

export const metadata = {
  title: "Manoheet Portfolio",
  description: "AI / ML Engineer Portfolio",
};

export default function RootLayout({
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