import "@/app/globals.css"; 
import Searchbar from "@/components/Searchbar/Searchbar";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="wrapper">
      <Searchbar />
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}