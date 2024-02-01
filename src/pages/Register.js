import React, { useState } from "react";
import logo from "../logo.png";
import eatingHealthy from "../assets/images/eatingHealthy.svg";
import "../App.css";
import { useMutation } from "@tanstack/react-query";
import { register } from "../api/auth";
import Skeleton from "../components/Skeleton";
import { Link, useNavigate } from "react-router-dom";
import ROUTER from "../navigation";

export const Register = () => {
  const [userInfo, setUserInfo] = useState({});
  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: () => register(userInfo),
    mutationKey: ["register"],
    onSuccess: () => {
      navigate(ROUTER.HOME);
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    mutate(userInfo);

    console.log(userInfo);
  };
  return (
    <div className="container mx-auto p-3 ">
      <header>
        <img src={logo} alt="logo" className="w-[25%]" />
      </header>

      <main>
        <div className="flex flex-col justify-center items-center h-[100dvh] md:justify-between md:flex-row">
          <div className="w-[50%]">
            <h1 className="text-3xl font-bold mb-4 text-center mainFont">
              Create your account!
            </h1>
            <form onSubmit={handleFormSubmit} className="text-center">
              <div className="mb-6">
                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={handleChange}
                  className="bg-gray-50 border my-2 border-gray-300 text-gray-900 rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
                  placeholder="Username"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  className="bg-gray-50 border my-2 border-gray-300 text-gray-900 rounded-lg focus:border-red-500 focus:ring-red-500 block w-full p-2.5 "
                  placeholder="Password"
                  required
                />
              </div>

              {isPending ? (
                <Skeleton
                  className={
                    "text-black  focus:ring-4 focus:outline-nonefont-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center subFont ]"
                  }
                >
                  Loading...
                </Skeleton>
              ) : (
                <button
                  type="submit"
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center subFont"
                >
                  REGISTER
                </button>
              )}
              {isError ? (
                <p className="text-red-500 text-sm mt-2 text-center font-bold">
                  {error?.response.data.message}
                </p>
              ) : null}

              <p className="mt-3 subFontLight">
                Already have an account?{" "}
                <Link to={ROUTER.LOGIN} className="text-orange-500 font-bold">
                  {" "}
                  LOG IN
                </Link>
              </p>
            </form>
          </div>

          <img src={eatingHealthy} alt="" className="w-[60%]" />
        </div>
      </main>
    </div>
  );
};
