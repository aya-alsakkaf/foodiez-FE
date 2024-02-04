import React, { useState } from "react";
import "../App.css";
import CardSkeleton from "../components/CardSkeleton";
import Hero from "../components/Hero";
import { useQuery } from "@tanstack/react-query";
import { getAllRecipes } from "../api/recipes";
import { getAllCategories, getRecipebyCategory } from "../api/categories";
import RecipeCard from "../components/RecipeCard";

const Recipes = () => {
  const [query, setQuery] = useState("");
  const [id, setId] = useState("");
  const { data: recipes, isLoading } = useQuery({
    queryKey: ["recipes"],
    queryFn: getAllRecipes,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const { data: recipesByCategory, isLoading: LoadingRecipes } = useQuery({
    queryKey: ["recipesByCategory"],
    queryFn: () => (id === "" ? null : getRecipebyCategory(id)),
  });

  const displayRecipes = recipes
    ?.filter((recipe) =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    )
    .map((recipe) => (
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
          onChange={(e) => setId(e.target.value)}
        >
          <option disabled selected>
            Select a category
          </option>
          <option value="" selected>
            All
          </option>
          {categories?.map((category) => (
            <option value={category.categoryName}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-10">
          <CardSkeleton count={16} />
        </div>
      ) : (
        <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 m-10">
          {displayRecipes}
        </div>
      )}

      {/* 
      //category filter
       */}
    </>
  );
};

export default Recipes;
