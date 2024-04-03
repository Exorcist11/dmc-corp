import Header from "../Header";
import Footer from "../Footer";

export default function ClientLayout({ children }) {
  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      <div className="mt-[80px]" style={{ flex: "1 0 auto" }}>{children}</div>
      <Footer />
    </div>
  );
}
