import React, { useEffect, useState } from "react";
import { getAllRecipes } from "../api/recipes";
import { useQuery } from "@tanstack/react-query";
import CardSkeleton from "./CardSkeleton";
import RecipeCard from "./RecipeCard";

const RecipeList = ({ id, query }) => {
  const [pageLimit, setPageLimit] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  const {
    data: recipes,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => getAllRecipes(id, pageNumber, pageLimit),
  });

  useEffect(() => {
    refetch();
  }, [id, pageLimit, pageNumber]);

  const displayRecipes = recipes?.recipes
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

  const numberOfPages = Math.ceil(recipes?.total / pageLimit);
  console.log(numberOfPages);
  const pageNumbers = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pageNumbers.push(
      <>
        <div
          className={`w-[20px] h-[20px] ${
            pageNumber == i ? "bg-green-500" : "bg-red-500"
          } text-center`}
          onClick={() => {
            setPageNumber(i);
          }}
        >
          {i}
        </div>
      </>
    );
  }
  return (
    <>
      {isLoading ? (
        <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-10">
          <CardSkeleton count={16} />
        </div>
      ) : (
        <>
          <div className="w-full flex justify-end pr-[60px]">
            <select
              onChange={(e) => {
                setPageLimit(e.target.value);
                if (
                  pageNumber >
                  Math.ceil(recipes?.recipes?.length / e.target.value)
                ) {
                  setPageNumber(1);
                }
              }}
            >
              <option value="5">5</option>
              <option value="10" selected>
                10
              </option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </select>
          </div>
          <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 m-10">
            {displayRecipes}
          </div>

          <div className="flex gap-3 w-full justify-center items-center">
            {pageNumbers}
          </div>
        </>
      )}
    </>
  );
};

export default RecipeList;
