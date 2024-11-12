import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Navbar from "./components/Navbar/Navbar";

const App = () => {

  const routes = (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/dashboard" exact element={<Home />}></Route>
        <Route path="/login" exact element={<Login />}></Route>
        <Route path="/signup" exact element={<Signup />}></Route>
      </Routes>
    </Router>
  );

  return (
    <div>
      {routes}
    </div>
  );
};

export default App;
