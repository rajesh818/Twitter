import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TwitterRoutes from "./pages/twitter-routes";
import LoginComponent from "./components/login/login";

const App = () => {
  return (
    <BrowserRouter basename="/app">
      <Routes>
        <Route path="/" element={<TwitterRoutes />}></Route>
      </Routes>
    </BrowserRouter>
    //   <div>
    //   <LoginComponent />
    // </div>
  );
};

export default App;
