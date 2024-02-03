import React, { useContext } from "react";
import logo from "../logo.png";
import { Link } from "react-router-dom";
import ROUTER from "../navigation";
import { UserContext } from "../context/UserContext";
import { deleteToken } from "../api/storage/token";

export const Navbar = () => {
  const { setUser, user } = useContext(UserContext);
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to={ROUTER.HOME}>Home</Link>
            </li>

            <li>
              <Link to={ROUTER.ADD_RECIPE}>Add Recipe</Link>
            </li>
            <li>
              <Link to={"#"}>My Recipe</Link>
            </li>
          </ul>
        </div>
        <Link
          to={ROUTER.HOME}
          className="btn bg-transparent hover:bg-transparent border-none  shadow-none text-xl"
        >
          <img
            src={logo}
            alt="logo"
            className="max-w-[220px] hidden md:block "
          />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={ROUTER.HOME}>Home</Link>
          </li>

          <li>
            <Link to={ROUTER.ADD_RECIPE}>Add Recipe</Link>
          </li>
          <li>
            <Link to={"#"}>My Recipe</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <button
            onClick={() => {
              deleteToken();
              setUser(false);
            }}
            className="btn bg-red-700 text-white hover:text-black"
          >
            LOGOUT
          </button>
        ) : (
          <Link
            to={ROUTER.LOGIN}
            className="btn bg-red-700 text-white hover:text-black"
          >
            LOGIN
          </Link>
        )}
      </div>
    </div>
  );
};
