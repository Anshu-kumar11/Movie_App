import React from "react";
import { BsFillSunsetFill } from "react-icons/bs";
import NavIcon from "../assets/navicon.png";
import Container from "./user/Container";
const NavBar = () => {
  return (
    <div className="bg-secondary shadow-sm shadow-gray-500">
      <Container className=" p-2">
        <div className="flex justify-between items-center ">
          <img className="h-10" src={NavIcon} alt="logo" />
          <ul className="flex items-center space-x-4 ">
            <li>
              <button className="bg-dark-subtle p-1 rounded">
                <BsFillSunsetFill className="text-secondary" size={24} />
              </button>
            </li>
            <li>
              <input
                type="text"
                className="border-2 border-dark-subtle p-1 rounded bg-transparent text-xl outline-none focus:border-white transition text-white"
                placeholder="search..."
                name=""
                id=""
              />
            </li>
            <li className="text-white font-semibold text-lg">Login</li>
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
