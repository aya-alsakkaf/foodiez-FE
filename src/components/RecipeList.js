import React, { useEffect } from "react";
import { getAllRecipes } from "../api/recipes";
import { useQuery } from "@tanstack/react-query";
import CardSkeleton from "./CardSkeleton";
import RecipeCard from "./RecipeCard";

const RecipeList = ({ id, query }) => {
  const {
    data: recipes,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => getAllRecipes(id),
  });

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);

  const displayRecipes = recipes
    ?.filter((recipe) =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    )
    ?.map((recipe) => (
      <RecipeCard
        id={recipe._id}
        image={recipe.image}
        title={recipe.title}
        category={recipe.category}
      />
    ));

  return (
    <>
      {isLoading ? (
        <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-10">
          <CardSkeleton count={16} />
        </div>
      ) : (
        <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 m-10">
          {displayRecipes}
        </div>
      )}
    </>
  );
};

export default RecipeList;
