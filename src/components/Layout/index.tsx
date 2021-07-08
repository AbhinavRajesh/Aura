import React from "react";
import Header from "../Header";
import Footer from "../Footer";

import "./index.scss";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  return (
    <div className="container">
      <Header />
      <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 min-h-85 flex justify-center items-center">
        {props.children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
