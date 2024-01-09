import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Nav from "./components/Nav";
import { useAuth } from "./context/AuthContext";
import { toast } from "react-toastify";

export default function Root() {
  const { user } = useAuth();
  if (!user) {
    toast.warn("Please Login First");
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Nav />
      <div className=" lg:w-[70%] md:w-[80%] w-[90%] mx-auto mt-3 ">
        <Outlet />
      </div>
    </>
  );
}
