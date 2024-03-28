import { useEffect } from "react";

export default function AdminPage() {
  useEffect(() => {
    document.title = "Trang quản lý";
  });
  return <div>AdminPage</div>;
}
