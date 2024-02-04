import React, { useEffect, useState } from "react";
import "../App.css";
import CardSkeleton from "../components/CardSkeleton";
import Hero from "../components/Hero";
import { useQuery, useQ } from "@tanstack/react-query";
import { getAllRecipes } from "../api/recipes";
import { getAllCategories, getRecipebyCategory } from "../api/categories";
import RecipeCard from "../components/RecipeCard";
import RecipeList from "../components/RecipeList";

const Recipes = () => {
  const [query, setQuery] = useState("");
  const [id, setId] = useState("");

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  return (
    <>
      <Hero />
      <form className="p-4 flex justify-center items-center">
        <input
          type="text"
          id="search"
          name="search"
          className="bg-gray-50 border my-2 mx-3 border-gray-300 text-gray-900 rounded-lg focus:ring-red-500 focus:border-red-500 block w-[50%] p-2.5 "
          placeholder="Search for recipes"
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button className="btn bg-red-700 text-white hover:text-black mainFont">
          SEARCH
        </button>
      </form>

      <div className="flex justify-center">
        <select
          class="select select-bordered w-full max-w-xs"
          onChange={(e) => {
            console.log(e.target.value);
            setId(e.target.value);
          }}
        >
          <option disabled selected>
            Select a category
          </option>
          <option value="all" selected>
            All
          </option>
          {categories?.map((category) => (
            <option value={category._id}>{category.categoryName}</option>
          ))}
        </select>
      </div>

      <RecipeList id={id} query={query} />
    </>
  );
};

export default Recipes;
