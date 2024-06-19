import React from "react";
import "./style.css";

export const Footer = ({ frameClassName }) => {
  return (
    <div className="footer">
      <div className="group">
        <div className="overlap-group">
          <div className={`frame ${frameClassName}`}>
            <img className="fluent-box" alt="Fluent box" src="fluent-box-16-regular.svg" />
            <div className="text-wrapper">마이</div>
            <div className="div">홈</div>
          </div>
          <img className="profile" alt="Profile" src="profile-1.png" />
        </div>
      </div>
    </div>
  );
};

export default Footer;