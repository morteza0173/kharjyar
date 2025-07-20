import Header from "@/components/appBar/Header";
import MobileMenu from "@/components/appBar/MobileMenu";
import SideMenu from "@/components/appBar/SideMenu";
import SyncBar from "@/components/SyncBar/SyncBar";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full">
      <SideMenu />
      <div className="pb-20 w-full">
        <div className="flex flex-col w-full">
          <Header />
          <div className="p-1 md:p-4">
            {children}
            <SyncBar />
          </div>
        </div>
      </div>
      <MobileMenu />
    </div>
  );
}
export default DashboardLayout;
