import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUserRecipes } from "../api/recipes";
import RecipeCard from "../components/RecipeCard";
import Alert from "../components/Alert";

const UserRecipes = () => {
  const { data: userRecipes, isError } = useQuery({
    queryKey: ["userRecipes"],
    queryFn: getUserRecipes,
  });
  const displayRecipes = userRecipes?.map((recipe) => (
    <RecipeCard
      id={recipe._id}
      image={recipe.image}
      title={recipe.title}
      category={recipe.category}
    />
  ));
  return (
    <>
      <div className="">
        <h1 className="text-3xl  text-center mt-10 mainFont">Your Recipes</h1>
      </div>
      {isError && (
        <div className="flex justify-center">
          <Alert
            text="You need an account to view your recipes"
            bg="bg-red-700 text-white text-center w-[50%]"
          />
        </div>
      )}
      <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 m-10">
        {displayRecipes}
      </div>
    </>
  );
};

export default UserRecipes;
