import Header from "../Header";
import Footer from "../Footer";

export default function ClientLayout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div style={{ flex: "1 0 auto" }}>{children}</div>
      <Footer />
    </div>
  );
}
