import * as React from "react"
import Footer from "./Footer";
import Header from "./Header";

const Layout: React.FC = ({ children }) => (
  <main style={{overflow:'hidden', position:'relative'}}>
    <Header />
      <div style={{minHeight:'calc(100vh - 110px)'}}>
        {children}
      </div>
    <Footer />
  </main>
);
export default Layout