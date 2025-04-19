import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cartIcon from "../assets/cart.png";

const Navbar = () => {
  const { cart } = useSelector((state) => state.product);
  return (
    <div className="min-h-[50px] flex items-center px-20 justify-between bg-gray-800">
      <div className="left space-x-4 text-lg flex items-center text-white px-5 ">
        <Link to={"/"}>
          {" "}
          <h2>Mini Ecommerce</h2>
        </Link>
        <ul className="flex items-center gap-x-5 text-base">
          <Link to={"/"}>
            <li className="text-white hover:text-blue-500 cursor-pointer">
              Home
            </li>
          </Link>
        </ul>
      </div>
      <div className="flex items-center gap-x-3 text-white">
        <Link to={"/cart"}>
          <button className="cursor-pointer">
            Cart ( <span className="text-green-500">{cart?.length}</span> )
          </button>
        </Link>
        {/* <button className="cursor-pointer">Login</button> */}
      </div>
    </div>
  );
};

export default Navbar;
