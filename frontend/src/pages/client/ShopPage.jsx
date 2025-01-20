import { useState } from "react";
import Header from "../../components/client/Header";
import Footer from "../../components/client/Footer";
import Sidebar from "../../components/client/Sidebar";
import Container from "../../components/client/shop/Container";

const ShopPage = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <div>
      <Header />
      <div className="flex max-w-7xl items-start justify-center gap-10 px-4 sm:px-5 md:px-7 lg:px-10 py-10 bg-white relative">
        <Sidebar
          toggleSidebar={toggleSidebar}
          setToggleSidebar={setToggleSidebar}
        />
        <Container
          toggleSidebar={toggleSidebar}
          setToggleSidebar={setToggleSidebar}
        />
      </div>

      <Footer />
    </div>
  );
};

export default ShopPage;
