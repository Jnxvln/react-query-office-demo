import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import NavBar from "./components/layout/NavBar";
import "react-toastify/dist/ReactToastify.css";
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <div id="site-wrapper">
      <div>
        <Header title="App Title" />
        <NavBar />

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnHover
        />

        <main id="site-main">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;
