import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUserRecipes } from "../api/recipes";
import RecipeCard from "../components/RecipeCard";

const UserRecipes = () => {
  const { data: userRecipes } = useQuery({
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
    <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 m-10">
      {displayRecipes}
    </div>
  );
};

export default UserRecipes;
