import React from "react";
import logo from "../../../public/assets/images/pokemon-logo-png-1432.png";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Nav() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const resp = await axios.post("/logout");
    if (resp.status === 200) {
      localStorage.removeItem("user");
      console.log("logout success");
      toast.success("Logout Successful.");
      navigate("/login");
    }
  };
  return (
    <>
      <nav className="bg-blue-900 border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="Flowbite Logo" />
          </Link>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <button
              onClick={handleLogout}
              className="text-sm  text-white dark:text-gray-500 hover:underline"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
