import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Home from "./pages/home/Home";
import { useAuthContext } from "./context/AuthContext";
import MessageContainer from "./components/messages/MessageContainer";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className=" h-screen sm:h-screen flex  sm:items-center sm:justify-center font-bold">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/messages/:id"
          element={authUser ? <MessageContainer /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
