import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getRecipeByID } from "../api/recipes";
import "../App.css";
import CardSkeleton from "../components/CardSkeleton";

const RecipeDetails = () => {
  const { id } = useParams();
  const { data: recipe, isLoading } = useQuery({
    queryKey: ["recipeID"],
    queryFn: () => getRecipeByID(id),
  });
  const baseImage = "http://localhost:8001/";
  return (
    <>
      {isLoading ? (
        <div className="p-5 flex flex-col justify-center items-center mt-2">
          <CardSkeleton />
        </div>
      ) : (
        <div className="p-5 flex flex-col justify-center items-center mt-2">
          <h1 className="mainFont text-xl"> {recipe?.title} </h1>
          {/* <img src={baseImage + recipe.image} alt={recipe.title} /> */}
          <div className=" md:w-[25%]">
            <img
              src="https://montevista.greatheartsamerica.org/wp-content/uploads/sites/2/2016/11/default-placeholder.png"
              alt={recipe?.title}
              className="object-fill"
            />
          </div>

          <div className=" grid grid-cols-3 gap-5 mt-3 md:gap-46  border-2 md:w-[50%] p-3">
            <div className="mb-2">
              <h1 className="font-bold">Prep Time</h1>
              <p>
                {recipe?.prepTime["value"] + " " + recipe?.prepTime["type"]}
              </p>
            </div>
            <div className="mb-2">
              <h1 className="font-bold"> Cook Time</h1>
              <p>
                {recipe?.cookTime["value"] + " " + recipe?.cookTime["type"]}
              </p>
            </div>
            <div className="mb-2">
              <h1 className="font-bold">Total Time</h1>
              <p>
                {parseInt(recipe?.cookTime["value"]) +
                  parseInt(recipe?.prepTime["value"]) +
                  " " +
                  recipe?.cookTime["type"]}
              </p>
            </div>
          </div>

          <div className="mt-5 md:w-[50%]">
            <h1 className="font-bold text-lg">Ingredients</h1>
            <ul className="space-y-4 text-left text-lg ">
              {recipe?.ingridents?.map((ingredient) => (
                <li className="flex items-center space-x-3 rtl:space-x-reverse my-2">
                  <svg
                    class="flex-shrink-0 w-3.5 h-3.5 text-red-700 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                  <span>{ingredient.ingrident}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-5 md:w-[50%]">
            <h1 className="font-bold text-lg">Steps</h1>
            <ul className="space-y-4 text-left text-lg text-red-700 ">
              {recipe?.steps?.map((step) => (
                <li className="list-decimal list-inside my-2">
                  <span className="text-black">{step.step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeDetails;
