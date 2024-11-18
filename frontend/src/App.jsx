import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import "./App.css";
import { Toaster } from "react-hot-toast";
import SearchInput from "./components/sidebar/SearchInput";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="p-5 h-screen sm:h-screen flex  sm:items-center sm:justify-center text-white font-bold">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
