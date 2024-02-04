import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ id, image, title, category }) => {
  const baseImage = "http://localhost:8001/";
  return (
    <Link className="" to={`/recipes/${id}`}>
      <div className="flex flex-col gap-4 w-70 p-2">
        <div className=" h-[340px] w-[340px]">
          <img src={baseImage + image} alt={title} className="object-fill h-[340px] w-[340px]" />
        </div>
        {category?.map((category) => (
          <div className=" badge bg-[#FE6E63] p-2 text-white badge-md">{category.categoryName}</div>
        ))}
        <div className=" h-4 w-full">
          <h1 className="subFontLight text-xl">{title}</h1>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
