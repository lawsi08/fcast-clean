export const metadata = {
  title: "FCAST - Cost Forecasting",
  description: "Financial forecasting and planning tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#F5F2E3" }}>{children}</body>
    </html>
  );
}
