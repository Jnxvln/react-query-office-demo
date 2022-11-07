import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div id="site-wrapper">
      <Header title="App Title" />

      <main id="site-main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
