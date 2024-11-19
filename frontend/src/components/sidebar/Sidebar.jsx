import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";
import leftArrow from "../../assets/left_arrow.png";
import rightArrow from "../../assets/right_arrow.png";

const Sidebar = () => {
  const navigate = useNavigate(); // Fixed typo
  return (
    <div className="border-r border-slate-500 px-10 py-5 sm:px-4 flex flex-col">
      <div className="flex">
        <img
          onClick={() => navigate(-1)} // Correct function usage
          className="w-8 p-2 rounded-2xl cursor-pointer"
          src={leftArrow}
          alt="Go Back"
        />
        <img
          onClick={() => navigate(1)} // Correct function usage
          className="w-8 p-2 rounded-2xl cursor-pointer"
          src={rightArrow}
          alt="Go Forward"
        />
      </div>

      <br></br>
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
