import Header from "../Header";
import Footer from "../Footer";
import { Toaster } from "react-hot-toast";
export default function ClientLayout({ children }) {
  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mt-[80px]" style={{ flex: "1 0 auto" }}>
        {children}
      </div>
      <Footer />
      
      
    </div>
  );
}
