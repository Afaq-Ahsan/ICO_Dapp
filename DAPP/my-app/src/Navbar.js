import React from "react";
import "./App.css";

const Navbar = ({ account }) => {
  return (
    <div className="Navbar_div">
      <h1 className="PTPS">PHOINIX Token Pre-Sale</h1>
      <h1 className="Top_Address">Connected address : {account}</h1>
      <marquee className="Marquee_tag">-- Presale is started --</marquee>
    </div>
  );
};

export default Navbar;
