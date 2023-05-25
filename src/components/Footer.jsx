import React from "react";
import "./Footer.css";
const Footer = () => {
  let year = new Date().getFullYear();
  return (
    <>
      <div className="text-center add-content p-3">
        Copyright © {year} Algo-Media
      </div>
    </>
  );
};

export default Footer;
