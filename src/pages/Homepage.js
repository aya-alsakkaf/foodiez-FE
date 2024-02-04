import React from "react";
import "../App.css";
import CardSkeleton from "../components/CardSkeleton";
import Hero from "../components/Hero";
import { useQuery } from "@tanstack/react-query";
import { getAllRecipes } from "../api/recipes";
import { getAllCategories } from "../api/categories";
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";

const Recipes = () => {
  const { data: recipes, isLoading } = useQuery({
    queryKey: ["recipes"],
    queryFn: getAllRecipes,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  // Think whether you will filter in FE or send a backend request to get filtered data.
  // If you filter in FE, you will have to use the categories data from the query above.
  // If you filter in BE, you will have to send a request to the backend with the category id as a query param.

  const displayRecipes = recipes?.map((recipe) => (
    <RecipeCard
      id={recipe._id}
      image={recipe.image}
      title={recipe.title}
      category={recipe.category}
    />
  ));
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
          {categories?.map((category) => (
            <option value={category.id}>{category.categoryName}</option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-10">
          <CardSkeleton count={16} />
        </div>
      ) : (
        <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-10">
          {displayRecipes}
        </div>
      )}

      {/* 
      //category filter
      //recipe cards */}
    </>
  );
};

export default Recipes;
