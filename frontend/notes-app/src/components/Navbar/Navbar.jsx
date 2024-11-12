import React, { useState } from "react";
import ProfilInfo from "../Cards/ProfilInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
  const [searchQuery, setSeachQuery] = useState("");

  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/login");
  };

  const handleSearch = () => {};

  const onClearSearch = () => {
    setSeachQuery("");
  };

  return (
    <div className="bg-white flex items-center justify-between px-5 py-3 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>

      <SearchBar
        value={searchQuery}
        onChange={({target}) => {setSeachQuery(target.value)}}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      <ProfilInfo onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
