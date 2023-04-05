import { ReactNode } from "react";
import Header from "./header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative">
      <Header />
      <div className="flex min-h-screen flex-col items-center bg-black bg-gradient-to-b px-4 pb-28 pt-24 text-white">
        {children}
      </div>
    </div>
  );
};

export default Layout;
