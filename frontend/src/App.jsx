import React from "react";
import NavBar from "./components/NavBar";
import SignIn from "./components/auth/SignIn";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/auth/SignUp";
import EmailVerification from "./components/auth/EmailVerification";
import ForgetPassword from "./components/auth/ForgetPassword";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/verification" element={<EmailVerification />} />
        <Route path="/auth/forget-password" element={<ForgetPassword />} />
        <Route path="/auth/confirm-password" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
