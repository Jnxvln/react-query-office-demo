import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import NavBar from "./components/layout/NavBar";

function App() {
  return (
    <div id="site-wrapper">
      <div>
        <Header title="App Title" />
        <NavBar />

        <main id="site-main">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;
