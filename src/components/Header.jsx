import React from "react";
import iconDisplay from "../assests/Display.svg"; 
import iconSvg from "../assests/down.svg";

const Header = ({ onToggleDropdown }) => {
  return (
    <div className="header">
      <button className="display-button" onClick={onToggleDropdown}>
        {/* Add SVG icon */}
        <img src={iconDisplay} alt="Display Icon" className="icon" />
        Display 
        <img src={iconSvg} alt="down Icon" className="icon" />
      </button>
    </div>
  );
};

export default Header;
