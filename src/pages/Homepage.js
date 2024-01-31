import React, { useContext, useState } from "react";
import chef from "../assets/images/Chef-cuate.svg";
import "../App.css";
import { UserContext } from "../context/UserContext";
import CardSkeleton from "../components/CardSkeleton";
const Recipes = () => {
  const user = useContext(UserContext);

  return (
    // create a hero section
    <>
      <div className="hero ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={chef} className="max-w-lg rounded-lg" />
          <div>
            <h1 className="text-5xl mainFont">Unleash your inner chef!</h1>
            <p className="py-6 subFont lg:w-max">
              Embrace the joy of cooking with Foodiez - Where every ingredient
              tells a story
            </p>
            {user ? null : (
              <button className="btn bg-red-700 text-white mainFont hover:text-black">
                LOGIN
              </button>
            )}
          </div>
        </div>
      </div>

      <form className="p-4 flex justify-center items-center">
        <input
          type="text"
          id="search"
          name="search"
          className="bg-gray-50 border my-2 mx-3 border-gray-300 text-gray-900 rounded-lg focus:ring-red-500 focus:border-red-500 block w-[50%] p-2.5 "
          placeholder="Search for recipes"
          required
        />
        <button className="btn bg-red-700 text-white hover:text-black mainFont">
          SEARCH
        </button>
      </form>

      <div className="flex justify-center">
        <select class="select select-bordered w-full max-w-xs">
          <option disabled selected>
            Select a category
          </option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>
      </div>

      <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-10">
        <CardSkeleton count={16} />
      </div>

      
      {/* 
      //category filter
      //recipe cards */}
    </>
  );
};

export default Recipes;
