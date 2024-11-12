import React from "react";
import ProfilInfo from "../Cards/ProfilInfo";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/login");
  };

  return (
    <div className="bg-white flex items-center justify-between px-5 py-3 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>

      <ProfilInfo onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
