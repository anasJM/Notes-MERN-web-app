import React from "react";
import ProfilInfo from "../Cards/ProfilInfo";

const Navbar = () => {
  return (
    <div className="bg-white flex items-center justify-between px-5 py-3 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>

      <ProfilInfo />
    </div>
  );
};

export default Navbar;
