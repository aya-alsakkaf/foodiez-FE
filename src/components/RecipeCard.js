import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ id, image, title, category }) => {
  const baseImage = "http://localhost:8001/";
  return (
    <Link to={`/recipes/${id}`}>
      <div className="flex flex-col gap-4 w-52">
        <div className=" h-32 w-full">
          <img src={baseImage + image} alt={title} />
        </div>
        {category?.map((category) => (
          <div className=" badge badge-neutral">{category.categoryName}</div>
        ))}
        <div className=" h-4 w-28">
          <h1>{title}</h1>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
