import React from "react";
import { Link } from "react-router-dom";
import notFound from "../assets/images/404 error with people holding the numbers-pana.svg";
import { Navbar } from "../components/Navbar";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <Link to="/">
        <div className=" h-[100dvh] flex justify-center items-center mt-4">
          <img src={notFound} alt="not found" className="w-[100%]" />
        </div>
      </Link>
    </>
  );
};

export default NotFound;
